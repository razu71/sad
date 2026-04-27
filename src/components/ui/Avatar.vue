<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  src?: string
  alt: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
}>(), {
  size: 'md',
})

const broken = ref(false)
const initials = computed(() => props.fallback ?? props.alt.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase())
const sizeClass = computed(() => ({
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}[props.size]))
const statusClass = computed(() => ({
  online: 'bg-[var(--success)]',
  offline: 'bg-[var(--muted)]',
  away: 'bg-[var(--warning)]',
  busy: 'bg-[var(--destructive)]',
}[props.status ?? 'offline']))
</script>

<template>
  <span :class="['relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]', sizeClass]">
    <img v-if="src && !broken" :src="src" :alt="alt" class="h-full w-full object-cover" @error="broken = true">
    <span v-else>{{ initials }}</span>
    <span v-if="status" aria-hidden="true" :class="['absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[var(--card)]', statusClass]" />
  </span>
</template>
