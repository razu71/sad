<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const baseClass = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50'
const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
  secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90',
  ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]',
  outline: 'border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]',
}
const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-11 px-6',
}

const props = withDefaults(
  defineProps<{
    as?: 'button' | 'a'
    type?: 'button' | 'submit' | 'reset'
    href?: string
    disabled?: boolean
    class?: string
    variant?: ButtonVariant
    size?: ButtonSize
  }>(),
  {
    as: 'button',
    type: 'button',
    variant: 'primary',
    size: 'md',
  },
)

const classes = computed(() => cn(baseClass, variantClass[props.variant], sizeClass[props.size], props.class))
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :href="as === 'a' ? href : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>

