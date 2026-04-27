<script setup lang="ts">
import { reactive } from 'vue'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
import type { NavItem } from '@/types/NavItem'
import { nav } from '@/lib/nav'
import AppLogo from '@/components/app/AppLogo.vue'
import Button from '@/components/ui/Button.vue'
import Collapsible from '@/components/ui/Collapsible.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  navigate: [to: string | undefined]
  'update:collapsed': [value: boolean]
}>()

const route = useRoute()
const submenuOpen = reactive<Record<string, boolean>>({})
const userPermission = 'admin'

function toPath(item: NavItem): string | undefined {
  return typeof item.to === 'string' ? item.to : undefined
}

function hasTo(item: NavItem): item is NavItem & { to: Exclude<NavItem['to'], undefined> } {
  return item.to !== undefined
}

function itemKey(item: NavItem): string {
  return toPath(item) ?? item.href ?? item.label
}

function isActive(item: NavItem) {
  const path = toPath(item)
  if (!path) {
    return false
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}

function isAllowed(item: NavItem) {
  if (!item.permission) {
    return true
  }

  const permissions = Array.isArray(item.permission) ? item.permission : [item.permission]
  return permissions.includes(userPermission)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center gap-1 border-b border-[var(--border)] px-2 py-2" :class="collapsed ? 'flex-col' : 'justify-between'">
      <AppLogo :collapsed="collapsed" />
      <Button variant="ghost" size="icon" type="button" :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'" @click="emit('update:collapsed', !collapsed)">
        <ChevronLeft v-if="!collapsed" class="h-4 w-4" />
        <ChevronRight v-else class="h-4 w-4" />
      </Button>
    </div>
    <nav aria-label="Primary" class="flex flex-col gap-1 overflow-y-auto px-2 py-2">
    <template v-for="item in nav.filter(isAllowed)" :key="itemKey(item)">
      <Collapsible v-if="item.children?.length && !collapsed" :open="Boolean(submenuOpen[itemKey(item)])" @update:open="submenuOpen[itemKey(item)] = $event">
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
          <template v-for="child in item.children.filter(isAllowed)" :key="itemKey(child)">
            <RouterLink
              v-if="hasTo(child)"
              :to="child.to"
              class="block rounded-[var(--radius-sm)] px-2 py-2 text-sm text-[var(--sidebar-text)]/80 hover:text-[var(--sidebar-active-text)]"
              @click="emit('navigate', toPath(child))"
            >
              {{ child.label }}
            </RouterLink>
            <a
              v-else
              :href="child.href"
              class="block rounded-[var(--radius-sm)] px-2 py-2 text-sm text-[var(--sidebar-text)]/80 hover:text-[var(--sidebar-active-text)]"
              @click="emit('navigate', toPath(child))"
            >
              {{ child.label }}
            </a>
          </template>
        </div>
      </Collapsible>
      <Tooltip v-else-if="collapsed" :content="item.label" side="right">
        <template #trigger>
          <RouterLink
            v-if="hasTo(item)"
            :to="item.to"
            :class="cn(
              'relative flex h-10 w-full items-center rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--sidebar-text)]/80 hover:text-[var(--sidebar-active-text)]',
              isActive(item) ? ' text-[var(--sidebar-active-text)]' : ''
            )"
            @click="emit('navigate', toPath(item))"
          >
            <span v-if="isActive(item)" class="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded" />
            <component v-if="item.icon" :is="item.icon" class="h-4 w-4 shrink-0" />
          </RouterLink>
          <a
            v-else-if="item.href"
            :href="item.href"
            class="relative flex h-10 w-full items-center rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--sidebar-text)]/80 hover:text-[var(--sidebar-active-text)]"
          >
            <component v-if="item.icon" :is="item.icon" class="h-4 w-4 shrink-0" />
          </a>
        </template>
      </Tooltip>
      <RouterLink
        v-else-if="hasTo(item)"
        :to="item.to"
        :class="cn(
          'relative flex h-10 items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--sidebar-text)]/80 hover:text-[var(--sidebar-active-text)]',
          isActive(item) ? 'text-[var(--sidebar-active-text)]' : ''
        )"
        @click="emit('navigate', toPath(item))"
      >
        <span v-if="isActive(item)" class="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded" />
        <component v-if="item.icon" :is="item.icon" class="h-4 w-4 shrink-0" />
        <span class="truncate">{{ item.label }}</span>
        <ChevronRight v-if="item.children?.length" class="ml-auto h-4 w-4" />
      </RouterLink>
      <a
        v-else-if="item.href"
        :href="item.href"
        class="relative flex h-10 items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--sidebar-text)]/80 hover:text-[var(--sidebar-active-text)]"
      >
        <component v-if="item.icon" :is="item.icon" class="h-4 w-4 shrink-0" />
        <span class="truncate">{{ item.label }}</span>
        <ChevronRight v-if="item.children?.length" class="ml-auto h-4 w-4" />
      </a>
    </template>
  </nav>
  </div>
</template>

