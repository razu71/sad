<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  attached?: boolean
  orientation?: 'horizontal' | 'vertical'
  class?: string
}>(), {
  attached: true,
  orientation: 'horizontal',
})
</script>

<template>
  <div :class="cn('inline-flex', orientation === 'vertical' ? 'flex-col' : 'flex-row', attached && '[&>*:not(:first-child)]:-ml-px [&>*]:rounded-none [&>*:first-child]:rounded-l-[var(--radius-md)] [&>*:last-child]:rounded-r-[var(--radius-md)]', props.class)">
    <slot />
  </div>
</template>
