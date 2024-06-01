import * as fs from 'node:fs/promises'
import {dirname, join as pathJoin} from 'node:path'
import * as url from 'node:url'
import {snakeCase} from 'change-case'
import {XMLParser} from 'fast-xml-parser'
import {generateMultiFileFromOas, getText, parseJsonOrYaml} from '@opensdks/cli'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sdkName = 'airbyte'

export async function download() {
  const html = await getText('https://reference.airbyte.com/openapi')
  const ret = new XMLParser({ignoreAttributes: false}).parse(html)

  // This applies to all openapi hosted on readme.com
  const oapis = [
    ...(ret.div as any[]).map((ele) => ({
      filename: `${sdkName}_${snakeCase(ele.a['#text'])}.oas.json`,
      oas: `https://reference.airbyte.com${ele.a['@_href']}`,
    })),
    {
      filename: 'airbyte_config.oas.yaml',
      oas: 'https://raw.githubusercontent.com/airbytehq/airbyte-platform/master/airbyte-api/src/main/openapi/config.yaml',
    },
  ]
  await Promise.all(
    oapis.map(async (oapi) => {
      const oasText = await getText(oapi.oas).catch((e) => {
        console.warn(`Failed to download ${oapi.filename}, skipping... ${e}`)
        return null
      })
      if (!oasText) {
        return
      }
      await fs.writeFile(pathJoin(__dirname, oapi.filename), oasText)
      console.log(`Downloaded ${oapi.filename}`)
    }),
  )
}

export async function generate() {
  await convertYamlToJson()
  return generateTypes()
}

export async function convertYamlToJson() {
  const fileNames = await fs.readdir(__dirname)
  const oasFilenames = fileNames.filter((p) => p.endsWith('.oas.yaml'))

  await Promise.all(
    oasFilenames.map(async (oasName) => {
      const yamlStr = await fs.readFile(pathJoin(__dirname, oasName), 'utf8')
      const json = parseJsonOrYaml(yamlStr)
      await fs.writeFile(
        pathJoin(__dirname, oasName.replace('.oas.yaml', '.oas.json')),
        JSON.stringify(json, null, 2),
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
