<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Bell, Menu } from 'lucide-vue-next'
import Breadcrumbs from '@/components/app/Breadcrumbs.vue'
import NotificationsPanel, { type NotificationItem } from '@/components/app/NotificationsPanel.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'
import UserMenu from '@/components/app/UserMenu.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Popover from '@/components/ui/Popover.vue'
import Select from '@/components/ui/Select.vue'
import { SUPPORTED_LOCALES, type AppLocale } from '@/lib/i18n'
import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const ui = useUiStore()
const { locale } = storeToRefs(ui)
const notificationOpen = ref(false)

const languageOptions = computed(() =>
  SUPPORTED_LOCALES.map((code) => ({
    label: t(`language.${code}`),
    value: code,
  })),
)

const notifications = ref<NotificationItem[]>([
  { id: '1', titleKey: 'notifications.welcomeTitle', timeKey: 'notifications.justNow', read: false },
  { id: '2', titleKey: 'notifications.themeTitle', timeKey: 'notifications.fiveMinAgo', read: false },
])

const unreadCount = computed(() => notifications.value.filter((item) => !item.read).length)

function openMobileMenu() {
  ui.openMobileDrawer()
}

function markAllRead() {
  notifications.value = notifications.value.map((item) => ({ ...item, read: true }))
}

function onLocaleSelect(value: string | string[]) {
  if (typeof value === 'string' && (value === 'en' || value === 'bn')) {
    ui.setLocale(value as AppLocale)
  }
}
</script>

<template>
  <header class="relative z-20 flex h-14 items-center justify-between gap-4 overflow-visible border-b border-[var(--topbar-border)] bg-[var(--topbar-bg)] px-4 text-[var(--topbar-text)]">
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon" class="md:hidden" :aria-label="$t('topbar.openMenu')" @click="openMobileMenu">
        <Menu class="h-4 w-4" />
      </Button>
      <Breadcrumbs />
    </div>
    <div class="relative z-20 flex items-center gap-2 [overflow:visible]">
      <div class="w-22 shrink-0 sm:w-20">
        <span class="sr-only">{{ $t('topbar.language') }}</span>
        <Select
          :model-value="locale"
          :options="languageOptions"
          :placeholder="$t('topbar.language')"
          @update:model-value="onLocaleSelect"
        />
      </div>
      <ThemeToggle variant="icon" />
      <Popover :open="notificationOpen" align="end" @update:open="notificationOpen = $event">
        <template #trigger>
          <Button variant="ghost" size="icon" class="relative" :aria-label="$t('topbar.openNotifications')">
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
