<script setup lang="ts">
import { reactive } from 'vue'
import { ChevronDown, ChevronLeft, ChevronRight, Menu } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
import type { NavItem } from '@/types/NavItem'
import AppLogo from '@/components/app/AppLogo.vue'
import Collapsible from '@/components/ui/Collapsible.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import { cn } from '@/lib/utils'

type SidebarNavItem = NavItem & {
  permission?: string | string[]
  children?: SidebarNavItem[]
}

const props = defineProps<{
  items: SidebarNavItem[]
  collapsed: boolean
}>()

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  navigate: [to: string]
}>()

const route = useRoute()
const submenuOpen = reactive<Record<string, boolean>>({})
const userPermission = 'admin'

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}

function isAllowed(item: SidebarNavItem) {
  if (!item.permission) {
    return true
  }

  const permissions = Array.isArray(item.permission) ? item.permission : [item.permission]
  return permissions.includes(userPermission)
}
</script>

<template>
  <div class="h-full">
    <div class="flex items-center justify-between px-2 py-2">
      <AppLogo :collapsed="collapsed" />
      <button
        type="button"
        class="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--sidebar-text)] hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--sidebar-active-text)]"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="emit('update:collapsed', !collapsed)"
      >
        <Menu v-if="collapsed" class="h-4 w-4" />
        <ChevronLeft v-else class="h-4 w-4" />
      </button>
    </div>
    <nav aria-label="Primary" :class="cn('flex flex-col gap-1 px-2 py-2', collapsed ? 'items-center' : '')">
    <template v-for="item in items.filter(isAllowed)" :key="item.to">
      <Collapsible v-if="item.children?.length && !collapsed" :open="Boolean(submenuOpen[item.to])" @update:open="submenuOpen[item.to] = $event">
        <template #trigger>
          <div class="flex w-full items-center justify-between gap-2">
            <span class="inline-flex items-center gap-2">
              <component v-if="item.icon" :is="item.icon" class="h-4 w-4" />
              <span>{{ item.label }}</span>
            </span>
            <ChevronDown class="h-4 w-4" />
          </div>
        </template>
        <div class="mt-1 space-y-1 pl-3">
          <RouterLink
            v-for="child in item.children.filter(isAllowed)"
            :key="child.to"
            :to="child.to"
            class="block rounded-[var(--radius-sm)] px-2 py-1.5 text-sm text-[var(--sidebar-text)]/80 hover:text-[var(--sidebar-active-text)]"
            @click="emit('navigate', child.to)"
          >
            {{ child.label }}
          </RouterLink>
        </div>
      </Collapsible>
      <Tooltip v-else-if="collapsed" :content="item.label" side="right">
        <template #trigger>
          <RouterLink
            :to="item.to"
            :class="cn(
              'relative flex w-10 items-center justify-center rounded-[var(--radius-md)] px-0 py-2 text-sm text-[var(--sidebar-text)]/80 hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--sidebar-active-text)]',
              isActive(item.to) ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' : ''
            )"
            @click="emit('navigate', item.to)"
          >
            <span v-if="isActive(item.to)" class="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded bg-[var(--primary)]" />
            <component v-if="item.icon" :is="item.icon" class="h-4 w-4 shrink-0" />
          </RouterLink>
        </template>
      </Tooltip>
      <RouterLink
        v-else
        :to="item.to"
        :class="cn(
          'relative flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--sidebar-text)]/80 hover:bg-[var(--sidebar-active-bg)] hover:text-[var(--sidebar-active-text)]',
          isActive(item.to) ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' : ''
        )"
        @click="emit('navigate', item.to)"
      >
        <span v-if="isActive(item.to)" class="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded bg-[var(--primary)]" />
        <component v-if="item.icon" :is="item.icon" class="h-4 w-4 shrink-0" />
        <span class="truncate">{{ item.label }}</span>
        <ChevronRight v-if="item.children?.length" class="ml-auto h-4 w-4" />
      </RouterLink>
    </template>
  </nav>
  </div>
</template>

