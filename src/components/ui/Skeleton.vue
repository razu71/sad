<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  as?: 'div' | 'span'
  class?: string
}>(), {
  as: 'div',
})
</script>

<template>
  <component :is="as" :class="cn('animate-pulse rounded-[var(--radius-sm)] bg-[var(--muted)]', props.class)" />
</template>
