import * as fs from 'node:fs/promises'
import {join as pathJoin} from 'node:path'
import {convertObj} from 'swagger2openapi'
import {
  generateMultiFileFromOas,
  generateSDKDef,
  getJson,
  getText,
  parseJsonOrYaml,
  prettyFormat,
} from '@opensdks/cli'
import type {DownloadableOpenAPI, ManifestInfo} from './manifest-def.js'
import {
  packageJsonTemplate,
  prettyWrite,
  tsConfigTemplate,
} from './templates.js'

export type Manifest = ManifestInfo & {name: string}

export async function syncManifests(
  baseDir: string,
  manifestMap: Record<string, ManifestInfo>,
) {
  const ms = Object.entries(manifestMap).map(([name, m]) => ({...m, name}))
  await Promise.all(ms.map((m) => syncManifest(baseDir, m)))
}

// TODO: Move most of these functionality into opensdks/cli

export async function syncManifest(baseDir: string, m: Manifest) {
  const basePath = pathJoin(baseDir, `../sdks/sdk-${m.name}`)

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

    await Promise.all(
      downloads.map(async (d) => {
        const oasText = await downloadOas(d)
        const format =
          d.format ??
          {
            json: 'json',
            yaml: 'yaml',
            yml: 'yaml',
          }[d.url.split('.').pop()?.toLowerCase() ?? ''] ??
          'json'

        console.log(`[${m.name}] Downloading ${d.url} ${format}`)
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
      console.log(`[${m.name}] generateTypes`)
      await generateTypes(basePath)

      console.log(`[${m.name}] generateIndex`)
      await generateIndex(basePath, {
        name: m.name,
        headersTemplate: m.headersTemplate,
      })
    }
  }

  await setupPackage()
  await download()
  await generate()
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json = parseJsonOrYaml(text) as Parameters<typeof convertObj>[0]

      if (json.swagger) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {openapi} = await convertObj(json, {})
        await fs.writeFile(
          pathJoin(dir, oasName),
          JSON.stringify(openapi, null, 2),
        )
      }
    }),
  )
}

export async function generateTypes(dir: string) {
  const fileNames = await fs.readdir(dir)
  await fs.mkdir(pathJoin(dir, 'src'), {recursive: true})
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.json'))

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

  if (oasFilenames.length === 1) {
    const sdkDef = generateSDKDef(opts.name, {
      importOasMeta: true,
      importOasTypes: true,
      headersTemplate: opts.headersTemplate,
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
    console.error('Only support single OAS for now')
  }
}

export async function downloadOas(ds: DownloadableOpenAPI) {
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

export default syncManifests

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
if (import.meta.url.endsWith(process.argv[1]!)) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const baseDir = pathJoin(process.cwd(), process.argv[2]!)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const manifestDir = pathJoin(baseDir, process.argv[3]!)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  const manifestMap = await import(manifestDir).then((m) => m.default ?? m)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void syncManifests(baseDir, manifestMap)
}
