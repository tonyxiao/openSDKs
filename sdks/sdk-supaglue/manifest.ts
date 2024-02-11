import * as fs from 'node:fs/promises'
import {dirname, join as pathJoin} from 'node:path'
import * as url from 'node:url'
import {snakeCase} from 'change-case'
import {generateMultiFileFromOas, getText} from '@opensdks/cli'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const APIS = [
  'crm',
  'engagement',
  'data',
  'mgmt',
  'actions',
  'metadata',
  'ticketing',
  'enrichment',
  'marketing-automation',
] as const

const sdkName = 'supaglue'

export async function download() {
  const oapis = APIS.map((name) => ({
    filename: `${sdkName}_${snakeCase(name)}.oas.json`,
    oas: `https://raw.githubusercontent.com/supaglue-labs/supaglue/main/openapi/v2/${name}/openapi.bundle.json`,
  }))
  await Promise.all(
    oapis.map(async (oapi) => {
      const oasText = await getText(oapi.oas)
      await fs.writeFile(pathJoin(__dirname, oapi.filename), oasText)
    }),
  )
}

export async function generate() {
  return generateTypes()
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
    .map((oasName) =>
      oasName.replace(`${sdkName}_`, '').replace('.oas.json', ''),
    )

  return `
  ${oasNames
    .map((n) => `import type Oas_${n} from '../${sdkName}_${n}.oas.types.js'`)
    .join('\n')}

${oasNames
  .map(
    (n) => `import {default as oas_${n}} from './${sdkName}_${n}.oas.meta.js'`,
  )
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
  .map((n) => `const ${n} = ctx.createClient<Oas_${n}['paths']>({
    ...options,
    baseUrl: options.baseUrl ?? oas_${n}.servers[0]?.url,
  })`)
  .join('\n')}

  return {
    ${oasNames.join(',\n')}
  }
*/

  `
}

// console.log(await download())
// console.log(await generate())
