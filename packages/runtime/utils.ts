export interface FlattenOptions {
  keypathStyle?: 'dot' | 'bracket'
}

/** used for formUrlEncodedBodySerializer */
export function flattenNestedObject(
  obj: Record<string, unknown>,
  {keypathStyle = 'dot'}: FlattenOptions = {},
) {
  const flattened = _flattenNestedObject(obj)
  if (keypathStyle === 'dot') {
    return flattened
  }
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(flattened)) {
    const [first, ...rest] = key.split('.')
    const newKey = `${first}${rest.map((k) => `[${k}]`).join('')}`
    out[newKey] = value
  }
  return out
}

/** We need an inner one because it is hard to support bracket syntax */
function _flattenNestedObject(obj: Record<string, unknown>) {
  const flatObject: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    // This covers both dictionaries and arrays
    if (value != null && typeof value === 'object') {
      const inner = _flattenNestedObject(value as Record<string, unknown>)
      for (const [innerKey, innerValue] of Object.entries(inner)) {
        flatObject[`${key}.${innerKey}`] = innerValue
      }
    } else {
      flatObject[key] = value
    }
  }
  return flatObject
}
