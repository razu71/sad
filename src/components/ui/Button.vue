<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonSize, ButtonVariant } from '@/lib/variants'
import { buttonSizeClasses, buttonVariantClasses } from '@/lib/variants'
import { cn } from '@/lib/utils'

const baseClass = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50'

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

const classes = computed(() => cn(baseClass, buttonVariantClasses[props.variant], buttonSizeClasses[props.size], props.class))
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

