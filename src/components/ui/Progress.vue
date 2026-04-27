<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: number
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  indeterminate: false,
  size: 'md',
})
</script>

<template>
  <div role="progressbar" :aria-valuenow="Math.max(0, Math.min(100, value))" aria-valuemin="0" aria-valuemax="100" :class="['w-full overflow-hidden rounded-full bg-[var(--muted)]', size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2']">
    <div :class="['h-full bg-[var(--primary)] transition-all', indeterminate && 'animate-pulse']" :style="indeterminate ? undefined : { width: `${Math.max(0, Math.min(100, value))}%` }" />
  </div>
</template>
