<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  disabled?: boolean
  invalid?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <select
    :value="props.modelValue"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    class="h-10 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <slot />
  </select>
</template>
