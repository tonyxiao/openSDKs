import * as fs from 'node:fs/promises'
import {dirname, join as pathJoin} from 'node:path'
import * as url from 'node:url'
import {snakeCase} from 'change-case'
import {generateMultiFileFromOas, getJson} from '@opensdks/cli'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const APIS = [
  'onboarding',
  'team',
  'payments',
  'transactions',
  'expenses',
  'webhooks',
  'budgets',
  'travel',
] as const

const sdkName = 'brex'

export async function download() {
  const oapis = APIS.map((name) => ({
    filename: `${sdkName}_${snakeCase(name)}.oas.json`,
    oas: `https://developer.brex.com/page-data/openapi/${name}_api/page-data.json`,
  }))
  // This appears to be a common pattern acrosss all redoc api pages, including also outreach. 
  // Would be good to extract it out into a utility function
  // curl --compressed https://developer.brex.com/page-data/openapi/onboarding_api/page-data.json | jq -r  .result.data.contentItem.data.redocStoreStr | jq .definition.data
  await Promise.all(
    oapis.map(async (oapi) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pageData: any = await getJson(oapi.oas)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const redocStore = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        pageData.result.data.contentItem.data.redocStoreStr,
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const oasText = JSON.stringify(redocStore.definition.data, null, 2)
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
