<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'
  size?: 'sm' | 'md'
  class?: string
}>(), {
  variant: 'default',
  size: 'md',
})

const variantClass = computed(() => ({
  default: 'bg-[var(--muted)] text-[var(--foreground)]',
  primary: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
  secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
  success: 'bg-[var(--success)] text-[var(--success-foreground)]',
  warning: 'bg-[var(--warning)] text-[var(--warning-foreground)]',
  destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
  outline: 'border border-[var(--border)] bg-transparent text-[var(--foreground)]',
}[props.variant]))

const sizeClass = computed(() => props.size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs')
</script>

<template>
  <span :class="cn('inline-flex items-center rounded-full font-medium', variantClass, sizeClass, props.class)">
    <slot />
  </span>
</template>
