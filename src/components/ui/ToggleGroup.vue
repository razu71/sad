<script setup lang="ts">
const props = defineProps<{
  modelValue: string | string[]
  type: 'single' | 'multiple'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

function onSelect(value: string) {
  if (props.type === 'single') {
    emit('update:modelValue', value)
    return
  }

  const list = Array.isArray(props.modelValue) ? props.modelValue : []
  emit('update:modelValue', list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
}
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <slot :on-select="onSelect" :model-value="modelValue" />
  </div>
</template>
