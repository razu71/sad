<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  label?: string
  class?: string
}>(), {
  size: 'md',
  label: 'Loading',
})

const sizeClass = computed(() => ({
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-7 w-7 border-[3px]',
}[props.size]))
</script>

<template>
  <span role="status" class="inline-flex items-center">
    <span :class="cn('inline-block animate-spin rounded-full border-[var(--muted)] border-t-[var(--primary)]', sizeClass, props.class)" />
    <span class="sr-only">{{ label }}</span>
  </span>
</template>
