<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import type { ButtonSize, ButtonVariant } from '@/lib/variants'
import { buttonSizeClasses, buttonVariantClasses } from '@/lib/variants'
import { cn } from '@/lib/utils'
import Spinner from '@/components/ui/Spinner.vue'

const baseClass = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50'

const props = withDefaults(
  defineProps<{
    as?: 'button' | 'a'
    type?: 'button' | 'submit' | 'reset'
    href?: string
    to?: RouteLocationRaw
    disabled?: boolean
    loading?: boolean
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

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => {
  if (props.to) {
    return RouterLink
  }

  return props.as
})

const isDisabled = computed(() => Boolean(props.disabled || props.loading))
const classes = computed(() => cn(baseClass, buttonVariantClasses[props.variant], buttonSizeClasses[props.size], props.class))

function onClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="as === 'button' ? type : undefined"
    :href="as === 'a' ? href : undefined"
    :disabled="as === 'button' ? isDisabled : undefined"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="loading || undefined"
    :class="classes"
    @click="onClick"
  >
    <slot name="leading" />
    <Spinner v-if="loading" size="sm" label="Loading" />
    <slot v-else />
    <slot name="trailing" />
  </component>
</template>

