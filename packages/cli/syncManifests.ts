import {join as pathJoin} from 'node:path'
import {syncManifests} from './generateFromManifest.js'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
if (import.meta.url.endsWith(process.argv[1]!)) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const baseDir = pathJoin(process.cwd(), process.argv[2]!)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const manifestPath = pathJoin(baseDir, process.argv[3]!)
  console.log('baseDir', baseDir, manifestPath)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const manifestMap = await import(manifestPath).then((m) => m.default ?? m)

  const sdk = process.argv[4]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  await syncManifests(baseDir, sdk ? {[sdk]: manifestMap[sdk]} : manifestMap)

  process.exit(0)
}
