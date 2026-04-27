<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'code' | 'span'
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'lead' | 'muted' | 'code'
  class?: string
}>(), {
  as: 'p',
  variant: 'p',
})

const classes = computed(() => cn({
  h1: 'text-3xl font-bold tracking-tight text-[var(--foreground)]',
  h2: 'text-2xl font-semibold tracking-tight text-[var(--foreground)]',
  h3: 'text-xl font-semibold text-[var(--foreground)]',
  p: 'text-sm text-[var(--foreground)]',
  lead: 'text-base text-[var(--foreground)]',
  muted: 'text-sm text-[var(--muted-foreground)]',
  code: 'rounded-[var(--radius-sm)] bg-[var(--muted)] px-1.5 py-0.5 font-mono text-xs text-[var(--foreground)]',
}[props.variant], props.class))
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
