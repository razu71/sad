import type { Ref } from 'vue'
import { unref } from 'vue'
import type { FieldMeta } from 'vee-validate'

export function fieldErrorDisplay(
  message: string | undefined,
  meta: FieldMeta<unknown> | Ref<FieldMeta<unknown>>,
  submitCount: number | Ref<number>,
): string {
  const m = unref(meta)
  const sc = unref(submitCount)
  if (!message) {
    return ''
  }

  if (m.dirty || sc > 0) {
    return message
  }

  return ''
}
