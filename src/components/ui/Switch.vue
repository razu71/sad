<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

function toggle() {
  if (props.disabled) {
    return
  }

  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="['inline-flex h-6 w-11 items-center rounded-full p-0.5 transition focus-visible:ring-2 focus-visible:ring-[var(--ring)]', modelValue ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]']"
    @click="toggle"
  >
    <span class="sr-only">{{ label ?? 'Toggle' }}</span>
    <span :class="['h-5 w-5 rounded-full bg-[var(--card)] transition', modelValue ? 'translate-x-5' : 'translate-x-0']" />
  </button>
</template>
