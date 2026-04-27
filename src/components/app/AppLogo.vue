<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

withDefaults(defineProps<{
  collapsed?: boolean
  to?: RouteLocationRaw
}>(), {
  collapsed: false,
  to: '/admin/dashboard',
})
</script>

<template>
  <RouterLink :to="to" class="inline-flex items-center gap-2 rounded-[var(--radius-md)] px-1 py-1">
    <span class="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] text-[var(--primary-foreground)] font-bold">
      A
    </span>
    <span v-if="!collapsed" class="truncate text-sm font-semibold text-[var(--sidebar-text)]">Admin Template</span>
  </RouterLink>
</template>
