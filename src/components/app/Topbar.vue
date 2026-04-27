<script setup lang="ts">
import { ref } from 'vue'
import { Bell, ChevronLeft, ChevronRight, Menu } from 'lucide-vue-next'
import Breadcrumbs from '@/components/app/Breadcrumbs.vue'
import NotificationsPanel, { type NotificationItem } from '@/components/app/NotificationsPanel.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'
import UserMenu from '@/components/app/UserMenu.vue'
import Button from '@/components/ui/Button.vue'
import Popover from '@/components/ui/Popover.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const notificationOpen = ref(false)
const notifications = ref<NotificationItem[]>([
  { id: '1', title: 'Welcome to the admin template', time: 'Just now', read: false },
  { id: '2', title: 'Theme switched successfully', time: '5m ago', read: false },
])

function openMobileMenu() {
  ui.setMobileOpen(true)
}

function toggleSidebar() {
  ui.setCollapsed(!ui.collapsed)
}

function markAllRead() {
  notifications.value = notifications.value.map((item) => ({ ...item, read: true }))
}
</script>

<template>
  <header class="flex h-14 items-center justify-between gap-4 border-b border-[var(--topbar-border)] bg-[var(--topbar-bg)] px-4 text-[var(--topbar-text)]">
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon" class="md:hidden" aria-label="Open menu" @click="openMobileMenu">
        <Menu class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" class="hidden md:inline-flex" :aria-label="ui.collapsed ? 'Expand sidebar' : 'Collapse sidebar'" @click="toggleSidebar">
        <ChevronRight v-if="ui.collapsed" class="h-4 w-4" />
        <ChevronLeft v-else class="h-4 w-4" />
      </Button>
      <Breadcrumbs />
    </div>
    <div class="flex items-center gap-2">
      <ThemeToggle variant="icon" />
      <Popover :open="notificationOpen" @update:open="notificationOpen = $event">
        <template #trigger>
          <Button variant="ghost" size="icon" aria-label="Open notifications">
            <Bell class="h-4 w-4" />
          </Button>
        </template>
        <NotificationsPanel :notifications="notifications" @mark-all-read="markAllRead" />
      </Popover>
      <UserMenu />
      <slot name="actions" />
    </div>
  </header>
</template>
