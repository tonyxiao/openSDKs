import * as fs from 'node:fs/promises'
import {dirname, join as pathJoin} from 'node:path'
import * as url from 'node:url'
import {snakeCase} from 'change-case'
import yaml from 'js-yaml' // We use `js-yaml` because `yaml` crashes on parsing xero_files.yaml

import prettier from 'prettier'
import {generateMultiFileFromOas, getJson, getText} from '@opensdks/cli'
import type {OpenAPISpec} from '@opensdks/runtime'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export type GetManifestResponse = {
  [name: string]: {
    path: string
    canPreview: boolean
  }
}

export async function download() {
  // https://gist.github.com/tonyxiao/01f55b892e92ba3f9fc0746796fc0390
  const manifest = await getJson<GetManifestResponse>(
    'https://raw.githubusercontent.com/XeroAPI/Xero-OpenAPI/master/manifest.json',
  )
  const oapis = Object.entries(manifest).map(([name, v]) => ({
    filename: `xero_${snakeCase(name)}.oas.yaml`,
    oas: `https://raw.githubusercontent.com/XeroAPI/Xero-OpenAPI/master/${v.path}`,
  }))

  await Promise.all(
    oapis.map(async (oapi) => {
      const oasText = await getText(oapi.oas)
      await fs.writeFile(pathJoin(__dirname, oapi.filename), oasText)
    }),
  )
}

export async function generate() {
  await generateJson()
  return generateTypes()
}

export async function generateJson() {
  const fileNames = await fs.readdir(__dirname)
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.yaml'))
  await Promise.all(
    oasFilenames.map(async (oasName) => {
      console.log('generating json for', oasName)
      const json = yaml.load(
        await fs.readFile(pathJoin(__dirname, oasName), 'utf-8'),
      ) as OpenAPISpec
      const requiredHeader = json.components?.parameters?.['requiredHeader']
      if (requiredHeader && 'required' in requiredHeader) {
        // Make xer-tenant-id optional as we are adding it as a global var
        requiredHeader.required = false
      }

      const destName = pathJoin(
        __dirname,
        oasName.replace('.oas.yaml', '.oas.json'),
      )

      await fs.writeFile(
        destName,
        await prettier.format(JSON.stringify(json), {
          ...(await import('../../prettier.config.js')).default,
          filepath: destName, // Sort imports will apply, better than just parser: json
        }),
      )
    }),
  )
}

export async function generateTypes() {
  const fileNames = await fs.readdir(__dirname)
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.json'))

  await Promise.all(
    oasFilenames.map(async (oasName) => {
      const ret = await generateMultiFileFromOas(pathJoin(__dirname, oasName))
      await fs.writeFile(
        pathJoin(
          __dirname,
          'src',
          oasName.replace('.oas.json', '.oas.meta.ts'),
        ),
        ret.meta,
      )
      await fs.writeFile(
        pathJoin(__dirname, oasName.replace('.oas.json', '.oas.types.d.ts')),
        ret.types,
      )
    }),
  )
}

export async function generateIndex() {
  const fileNames = await fs.readdir(__dirname)
  const oasNames = fileNames
    .filter((p) => p.endsWith('.oas.json'))
    .map((oasName) => oasName.replace('xero_', '').replace('.oas.json', ''))

  return `
  ${oasNames
    .map((n) => `import type Oas_${n} from '../xero_${n}.oas.types.js'`)
    .join('\n')}

${oasNames
  .map((n) => `import {default as oas_${n}} from './xero_${n}.oas.meta.js'`)
  .join('\n')}

export type {
  ${oasNames.map((oasName) => `Oas_${oasName}`).join(',\n  ')},
}

export {
  ${oasNames.map((oasName) => `oas_${oasName}`).join(',\n  ')},
}


/*
// Copy paste this part manually into createClient... 
${oasNames
  .map(
    (n) => `const ${n} = ctx.createClient<Oas_${n}['paths']>({
    ...options,
    baseUrl: options.baseUrl ?? oas_${n}.servers[0]?.url,
  })`,
  )
  .join('\n')}

  return {
    ${oasNames.join(',\n')}
  }
*/
  `
}

// console.log(await download())
// console.log(await generate())
