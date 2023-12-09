import type {oas30} from '@opensdks/core'
import _oas from './slack.orig.oas.json'

const oas = _oas as unknown as oas30.OpenAPIObject

// TODO: we should add token auth to the modified openapi spec
for (const pathItem of Object.values(oas.paths ?? {})) {
  for (const op of Object.values(pathItem)) {
    if (!isOperationWithParam(op)) {
      continue
    }
    const idx =
      op.parameters?.findIndex((p) => 'name' in p && p.name === 'token') ?? -1
    const param =
      idx >= 0
        ? (op.parameters?.splice(idx, 1)[0] as
            | oas30.ParameterObject
            | undefined)
        : undefined
    // console.log('removed', {idx}, param)
    const scope = param?.description?.match(/Requires scope: \`(.+)\`/)
    // console.log('scope', scope)
    if (scope?.[1]) {
      op['x-required-scope'] = scope[1]
      op.description = [op.description, scope[0]].filter((i) => !!i).join(' ')
    }
  }
}

function isOperationWithParam(op: unknown): op is oas30.OperationObject {
  return op != null && typeof op === 'object' && 'parameters' in op
}

if (require.main === module) {
  console.log(JSON.stringify(oas, null, 2))
}
