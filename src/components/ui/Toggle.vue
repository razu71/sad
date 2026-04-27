<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  pressed?: boolean
}>(), {
  pressed: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  emit('update:modelValue', !(props.pressed ?? props.modelValue))
}
</script>

<template>
  <button type="button" :aria-pressed="pressed ?? modelValue" class="inline-flex h-9 items-center rounded-[var(--radius-md)] border border-[var(--border)] px-3 text-sm text-[var(--foreground)] hover:bg-[var(--accent)]" @click="toggle">
    <slot />
  </button>
</template>
