type FieldPathMap = { path: string; id: string }[]

export function focusFirstErrorField(
  order: FieldPathMap,
  errors: Partial<Record<string, string | undefined>>,
) {
  for (const { path, id } of order) {
    if (errors[path]) {
      document.getElementById(id)?.focus()
      return
    }
  }
}
