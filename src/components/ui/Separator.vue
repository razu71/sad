<script setup lang="ts">
const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}>(), {
  orientation: 'horizontal',
  decorative: false,
})
</script>

<template>
  <div
    :role="decorative ? undefined : 'separator'"
    :aria-orientation="orientation"
    :class="orientation === 'horizontal' ? 'h-px w-full bg-[var(--border)]' : 'h-full w-px bg-[var(--border)]'"
  />
</template>
