<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  modelValue: string
  rows?: number
  autosize?: boolean
  placeholder?: string
  invalid?: boolean
  disabled?: boolean
  readonly?: boolean
  class?: string
}>(), {
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const el = ref<HTMLTextAreaElement | null>(null)
const classes = computed(() => cn('w-full rounded-[var(--radius-md)] border bg-[var(--input)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]', props.invalid ? 'border-[var(--destructive)]' : 'border-[var(--border)]', props.class))

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

async function resizeIfNeeded() {
  if (!props.autosize || !el.value) {
    return
  }

  await nextTick()
  el.value.style.height = 'auto'
  el.value.style.height = `${el.value.scrollHeight}px`
}

watch(() => props.modelValue, resizeIfNeeded, { immediate: true })
</script>

<template>
  <textarea
    ref="el"
    :value="modelValue"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :aria-invalid="invalid || undefined"
    :class="classes"
    @input="onInput"
  />
</template>
