export function flattenMessages(obj: unknown, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {}
  if (obj === null || obj === undefined) {
    return out
  }

  if (typeof obj !== 'object' || Array.isArray(obj)) {
    if (prefix) {
      out[prefix] = String(obj)
    }
    return out
  }

  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenMessages(v, key))
    } else {
      out[key] = v === undefined || v === null ? '' : String(v)
    }
  }

  return out
}

export function dotToNested(flat: Record<string, string>): Record<string, unknown> {
  const root: Record<string, unknown> = {}
  for (const [path, val] of Object.entries(flat)) {
    if (!path) {
      continue
    }

    const parts = path.split('.')
    let cur: Record<string, unknown> = root
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]
      if (!p) {
        continue
      }

      if (i === parts.length - 1) {
        cur[p] = val
      } else {
        const next = cur[p]
        if (!next || typeof next !== 'object' || Array.isArray(next)) {
          cur[p] = {}
        }
        cur = cur[p] as Record<string, unknown>
      }
    }
  }

  return root
}

export function getByDotPath(obj: unknown, path: string): string {
  if (!path || obj === null || obj === undefined) {
    return ''
  }

  const parts = path.split('.')
  let cur: unknown = obj
  for (const p of parts) {
    if (!p) {
      return ''
    }

    if (cur === null || typeof cur !== 'object') {
      return ''
    }

    cur = (cur as Record<string, unknown>)[p]
  }

  return typeof cur === 'string' ? cur : ''
}

export function deepMerge<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
  const out = { ...target } as Record<string, unknown>
  for (const key of Object.keys(source)) {
    const sv = source[key]
    const tv = out[key]
    if (
      sv !== null
      && typeof sv === 'object'
      && !Array.isArray(sv)
      && tv !== null
      && typeof tv === 'object'
      && !Array.isArray(tv)
    ) {
      out[key] = deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>)
    } else {
      out[key] = sv
    }
  }

  return out as T
}
