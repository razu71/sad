<script setup lang="ts">
import { computed, ref } from 'vue'
import { Bell, Menu } from 'lucide-vue-next'
import Breadcrumbs from '@/components/app/Breadcrumbs.vue'
import NotificationsPanel, { type NotificationItem } from '@/components/app/NotificationsPanel.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'
import UserMenu from '@/components/app/UserMenu.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Popover from '@/components/ui/Popover.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const notificationOpen = ref(false)
const notifications = ref<NotificationItem[]>([
  { id: '1', title: 'Welcome to the admin template', time: 'Just now', read: false },
  { id: '2', title: 'Theme switched successfully', time: '5m ago', read: false },
])

const unreadCount = computed(() => notifications.value.filter((item) => !item.read).length)

function openMobileMenu() {
  ui.openMobileDrawer()
}

function markAllRead() {
  notifications.value = notifications.value.map((item) => ({ ...item, read: true }))
}
</script>

<template>
  <header class="relative z-20 flex h-14 items-center justify-between gap-4 overflow-visible border-b border-[var(--topbar-border)] bg-[var(--topbar-bg)] px-4 text-[var(--topbar-text)]">
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon" class="md:hidden" aria-label="Open menu" @click="openMobileMenu">
        <Menu class="h-4 w-4" />
      </Button>
      <Breadcrumbs />
    </div>
    <div class="relative z-20 flex items-center gap-2 [overflow:visible]">
      <ThemeToggle variant="icon" />
      <Popover :open="notificationOpen" align="end" @update:open="notificationOpen = $event">
        <template #trigger>
          <Button variant="ghost" size="icon" class="relative" aria-label="Open notifications">
            <Bell class="h-4 w-4" />
            <Badge v-if="unreadCount > 0" variant="destructive" size="sm" class="absolute -right-0.5 -top-0.5 min-w-[1.125rem] justify-center px-1">
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </Badge>
          </Button>
        </template>
        <NotificationsPanel :notifications="notifications" @mark-all-read="markAllRead" />
      </Popover>
      <UserMenu />
      <slot name="actions" />
    </div>
  </header>
</template>
