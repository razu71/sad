<script lang="ts">
export default {}
</script>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import type { NavItem } from '@/lib/nav'
import { cn } from '@/lib/utils'

const props = defineProps<{
  items: NavItem[]
  collapsed: boolean
}>()

const route = useRoute()

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}

const wrapperClass = computed(() => cn('flex flex-col gap-1 px-2 py-2', props.collapsed ? 'items-center' : ''))
</script>

<template>
  <nav :class="wrapperClass">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      :class="cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--sidebar-text)]/80 hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--sidebar-active-text)]',
        collapsed ? 'w-10 justify-center px-0' : '',
        isActive(item.to) ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' : ''
      )"
    >
      <component v-if="item.icon" :is="item.icon" class="h-4 w-4 shrink-0" />
      <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

