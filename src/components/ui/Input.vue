<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  modelValue: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  id?: string
  autocomplete?: string
  class?: string
}>(), {
  type: 'text',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [event: Event]
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const sizeClass = computed(() => ({
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-11 px-4 text-base',
}[props.size]))

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}
</script>

<template>
  <div class="relative flex items-center">
    <slot name="leading" />
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-invalid="invalid || undefined"
      :class="cn('w-full rounded-[var(--radius-md)] border bg-[var(--input)] text-[var(--foreground)] outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)]', invalid ? 'border-[var(--destructive)]' : 'border-[var(--border)]', sizeClass, props.class)"
      @input="onInput"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
    <slot name="trailing" />
  </div>
</template>
