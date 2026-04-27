<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  padded?: boolean
  bordered?: boolean
  hoverable?: boolean
  class?: string
}>(), {
  padded: true,
  bordered: true,
})
</script>

<template>
  <section :class="cn('rounded-[var(--radius-md)] bg-[var(--card)] text-[var(--card-foreground)]', padded && 'p-4', bordered && 'border border-[var(--border)]', hoverable && 'transition hover:shadow-[var(--shadow-md)]', props.class)">
    <header v-if="$slots.header" class="mb-3">
      <slot name="header" />
    </header>
    <slot />
    <footer v-if="$slots.footer" class="mt-3">
      <slot name="footer" />
    </footer>
  </section>
</template>
