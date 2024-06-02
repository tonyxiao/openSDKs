import {join as pathJoin} from 'node:path'
import {syncManifests} from './generateFromManifest.js'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
if (import.meta.url.endsWith(process.argv[1]!)) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const baseDir = pathJoin(process.cwd(), process.argv[2]!)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const manifestPath = pathJoin(baseDir, process.argv[3]!)
  console.log('baseDir', baseDir, manifestPath)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  const manifestMap = await import(manifestPath)
    .then((m) => m.default ?? m)
    .catch((e) => {
      console.error(e)
      throw new Error('Failed to load manifest')
    })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void syncManifests(baseDir, manifestMap)
}
