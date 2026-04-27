<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'horizontal',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="space-y-3">
    <div role="tablist" :aria-orientation="orientation" :class="orientation === 'horizontal' ? 'flex gap-2' : 'flex flex-col gap-2'">
      <slot name="tabs" :model-value="modelValue" :set-value="(value: string) => emit('update:modelValue', value)" />
    </div>
    <div role="tabpanel">
      <slot />
    </div>
  </div>
</template>
