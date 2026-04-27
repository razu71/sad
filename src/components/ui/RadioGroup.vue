<script setup lang="ts">
type Option = { label: string; value: string }

const props = withDefaults(defineProps<{
  modelValue: string
  options: Option[]
  name: string
  orientation?: 'horizontal' | 'vertical'
}>(), {
  orientation: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div role="radiogroup" :class="orientation === 'horizontal' ? 'flex items-center gap-4' : 'space-y-2'">
    <label v-for="option in options" :key="option.value" class="inline-flex items-center gap-2 text-sm text-[var(--foreground)]">
      <input
        :name="name"
        type="radio"
        :value="option.value"
        :checked="option.value === modelValue"
        class="h-4 w-4 accent-[var(--primary)]"
        @change="emit('update:modelValue', option.value)"
      >
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>
