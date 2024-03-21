import type {oas30} from '@opensdks/runtime'
import _oas from '../finch.orig.oas.json'

const oas = _oas as unknown as oas30.OpenAPIObject

// Remove FINCH-API-VERSION header from every operation given that
// we are already adding it on a global basis
for (const pathItem of Object.values(oas.paths ?? {})) {
  for (const op of Object.values(pathItem)) {
    if (!isOperationWithParam(op)) {
      continue
    }
    const idx =
      op.parameters?.findIndex(
        (p) => '$ref' in p && p.$ref === '#/components/parameters/API-Version',
      ) ?? -1
    if (idx >= 0) {
      op.parameters?.splice(idx, 1)
    }
  }
}

function isOperationWithParam(op: unknown): op is oas30.OperationObject {
  return op != null && typeof op === 'object' && 'parameters' in op
}

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas))
}
