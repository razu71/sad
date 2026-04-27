<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number | [number, number]
  min: number
  max: number
  step: number
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | [number, number]]
}>()
</script>

<template>
  <input
    role="slider"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :value="Array.isArray(modelValue) ? modelValue[0] : modelValue"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="Array.isArray(modelValue) ? modelValue[0] : modelValue"
    class="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--muted)] accent-[var(--primary)]"
    @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
  >
</template>
