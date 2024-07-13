import * as fs from 'node:fs/promises'
import {join as pathJoin} from 'node:path'
import {snakeCase} from 'change-case'
import {XMLParser} from 'fast-xml-parser'
import {convertObj} from 'swagger2openapi'
import type {DownloadableOpenAPI, ManifestInfo} from './manifest-def.js'
import {
  packageJsonTemplate,
  prettyWrite,
  tsConfigTemplate,
} from './templates.js'
import {
  generateMultiFileFromOas,
  generateSDKDef,
  getJson,
  getText,
  parseJsonOrYaml,
  prettyFormat,
} from './utils.js'

export type Manifest = ManifestInfo & {name: string}

export async function syncManifests(
  baseDir: string,
  manifestMap: Record<string, ManifestInfo>,
) {
  console.log('Syncing manifests...', Object.keys(manifestMap))
  const ms = Object.entries(manifestMap).map(([name, m]) => ({...m, name}))
  await Promise.all(ms.map((m) => syncManifest(baseDir, m)))
}

export async function syncManifest(baseDir: string, m: Manifest) {
  const basePath = pathJoin(baseDir, `sdks/sdk-${m.name}`)

  async function setupPackage() {
    await fs.mkdir(basePath, {recursive: true})
    await prettyWrite({
      path: pathJoin(basePath, 'package.json'),
      format: 'package.json',
      data: {
        name: `@opensdks/sdk-${m.name}`,
        version: m.version ?? '0.0.0',
        ...(packageJsonTemplate as {}),
      },
    })
    await prettyWrite({
      path: pathJoin(basePath, 'tsconfig.build.json'),
      format: 'tsconfig.json',
      data: {
        ...tsConfigTemplate,
        // For now until we figure out the cannot be named w/o a reference problem
        // @see https://share.cleanshot.com/V2q3rQBR
        include: ['./src/**/*.ts'],
        exclude: [...(tsConfigTemplate.exclude ?? []), '**/*.oas.ts'],
      },
    })
  }

  async function download() {
    const downloads =
      typeof m.download === 'string'
        ? [{name: m.name, url: m.download} satisfies DownloadableOpenAPI]
        : m.download
          ? await m.download?.()
          : []

    // If there is only a single oas, we can name it the same as the package
    if (downloads.length === 1 && downloads[0]) {
      downloads[0].name = m.name
    }

    await Promise.all(
      downloads.map(async (d) => {
        const oasText = await downloadOas(d).catch((e) => {
          console.warn(`Failed to download ${d.name}, skipping... ${e}`)
          return null
        })
        if (!oasText) {
          return
        }
        const format =
          d.format ??
          {
            json: 'json',
            yaml: 'yaml',
            yml: 'yaml',
          }[d.url?.split('.').pop()?.toLowerCase() ?? ''] ??
          'json'

        console.log(`[${m.name}] Downloading ${d.url ?? d.type} ${format}`)
        const oasPath = pathJoin(basePath, `${d.name}.oas.${format}`)
        await fs.writeFile(oasPath, oasText)
      }),
    )
  }

  async function generate() {
    if (m.generate) {
      await m.generate()
    } else {
      console.log(`[${m.name}] convertYamlToJson`)
      await convertYamlToJson(basePath)
      console.log(`[${m.name}] convertSwagger2ToOpenAPI`)
      await convertSwagger2ToOpenAPI(basePath)
      console.log(`[${m.name}] generateMetaAndDts`)
      await generateMetaAndDts(basePath)

      console.log(`[${m.name}] generateIndex`)
      await generateIndex(basePath, {
        name: m.name,
        headersTemplate: m.headersTemplate,
      })
    }
  }

  await setupPackage()
  // console.log(`[${m.name}] setupPackage()`)
  await download()
  // console.log(`[${m.name}] download()`)
  await generate()
  // console.log(`[${m.name}] generate()`)
}

export async function convertYamlToJson(dir: string) {
  const fileNames = await fs.readdir(dir)
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.yaml'))

  await Promise.all(
    oasFilenames.map(async (oasName) => {
      const yamlStr = await fs.readFile(pathJoin(dir, oasName), 'utf8')
      const json = parseJsonOrYaml(yamlStr)
      await fs.writeFile(
        pathJoin(dir, oasName.replace('.oas.yaml', '.oas.json')),
        JSON.stringify(json, null, 2),
      )
    }),
  )
}

export async function convertSwagger2ToOpenAPI(dir: string) {
  const fileNames = await fs.readdir(dir)
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.json'))

  await Promise.all(
    oasFilenames.map(async (oasName) => {
      const text = await fs.readFile(pathJoin(dir, oasName), 'utf8')
      const json = parseJsonOrYaml(text) as Parameters<typeof convertObj>[0]

      if (!('openapi' in json) || json.swagger) {
        const {openapi} = await convertObj(json, {})
        await fs.writeFile(
          pathJoin(dir, oasName),
          JSON.stringify(openapi, null, 2),
        )
      }
    }),
  )
}

export async function generateMetaAndDts(dir: string) {
  const fileNames = await fs.readdir(dir)
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.json'))
  await fs.mkdir(pathJoin(dir, 'src'), {recursive: true})

  await Promise.all(
    oasFilenames.map(async (oasName) => {
      const ret = await generateMultiFileFromOas(pathJoin(dir, oasName))
      await fs.writeFile(
        pathJoin(dir, 'src', oasName.replace('.oas.json', '.oas.meta.ts')),
        ret.meta,
      )
      await fs.writeFile(
        pathJoin(dir, oasName.replace('.oas.json', '.oas.types.d.ts')),
        ret.types,
      )
    }),
  )
}

export async function generateIndex(
  dir: string,
  opts: {name: string; headersTemplate?: string},
) {
  const fileNames = await fs.readdir(dir)
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.json'))

  if (oasFilenames.length >= 1) {
    const sdkDef = generateSDKDef(opts.name, {
      importOasMeta: oasFilenames.length === 1,
      importOasTypes: oasFilenames.length === 1,
      headersTemplate: opts.headersTemplate,
      oasNames:
        oasFilenames.length > 1
          ? oasFilenames.map((oasName) =>
              oasName.replace(`${opts.name}_`, '').replace('.oas.json', ''),
            )
          : undefined,
    })
    const out = await prettyFormat(`
    /** 
     * This file was generated by @opensdks/cli, do not edit manually.
     * For bugs & feature requests, please open an issue on the [GitHub](https://github.com/tonyxiao/openSDKs)
     */
    ${sdkDef}
    `)
    await fs.writeFile(pathJoin(dir, 'src', 'index.ts'), out)
  } else {
    console.error('No OAS files found')
  }
}

export async function downloadOas(ds: DownloadableOpenAPI) {
  if (ds.type === 'raw') {
    return ds.data
  }
  if (ds.type === 'redoc') {
    return downloadRedocOas(ds.url)
  }
  return getText(ds.url)
}

export async function downloadRedocOas(url: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageData: any = await getJson(url)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const redocStore = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    pageData.result.data.contentItem.data.redocStoreStr,
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const oasText = JSON.stringify(redocStore.definition.data, null, 2)
  return oasText
}

export async function parseDownloadableOasListFromReadmeIo(
  _readmeUrl: string,
  opts: {name: string},
) {
  const readmeUrl = _readmeUrl.replace(/\/$/, '')
  const html = await getText(`${readmeUrl}/openapi`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const ret = new XMLParser({ignoreAttributes: false}).parse(html)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const divs: any[] = Array.isArray(ret.div) ? ret.div : [ret.div]

  // This applies to all openapi hosted on readme.com
  const oapis = divs.map(
    (ele) =>
      ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        name: `${opts.name}_${snakeCase(ele.a['#text'])}`,
        url: `${readmeUrl}${ele.a['@_href']}`,
        // TODO: some of the OAS does not exist from readme...
      }) satisfies DownloadableOpenAPI,
  )
  return oapis
}
