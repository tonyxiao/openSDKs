import * as fs from 'node:fs/promises'
import {dirname, join as pathJoin} from 'node:path'
import * as url from 'node:url'
import {generateMultiFileFromOas, getJson} from '@opensdks/cli'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sdkName = 'heron'

export async function download() {
  const oapis = [
    {
      filename: `${sdkName}.oas.json`,
      oas: 'https://app.herondata.io/swagger/',
    },
  ]
  // This appears to be a common pattern acrosss all redoc api pages, including also outreach.
  // Would be good to extract it out into a utility function
  // curl --compressed https://developer.brex.com/page-data/openapi/onboarding_api/page-data.json | jq -r  .result.data.contentItem.data.redocStoreStr | jq .definition.data
  await Promise.all(
    oapis.map(async (oapi) => {
      const oas = await getJson(oapi.oas)
      const oasText = JSON.stringify(oas, null, 2)
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
