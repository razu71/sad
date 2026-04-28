<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Settings, User, LogOut, Moon, Sun } from 'lucide-vue-next'
import Avatar from '@/components/ui/Avatar.vue'
import Button from '@/components/ui/Button.vue'
import Popover from '@/components/ui/Popover.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'
import { userAvatarImageUrl } from '@/lib/userAvatar'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const open = ref(false)
const { t } = useI18n()

const resolvedThemeIcon = computed(() => (ui.resolvedTheme === 'dark' ? Moon : Sun))

const menuUserId = computed(() => auth.user?.id ?? 'demo-1')
const triggerAvatarSrc = computed(() => userAvatarImageUrl(menuUserId.value, 'sm'))
const panelAvatarSrc = computed(() => userAvatarImageUrl(menuUserId.value, 'md'))

async function logout() {
  open.value = false
  await auth.logout()
}
</script>

<template>
  <Popover :open="open" align="end" @update:open="open = $event">
    <template #trigger>
      <button type="button" class="inline-flex items-center rounded-full focus-visible:ring-2 focus-visible:ring-[var(--ring)]" :aria-label="$t('topbar.openUserMenu')">
        <Avatar :src="triggerAvatarSrc" :alt="auth.user?.name ?? t('userMenu.guestName')" :fallback="auth.user?.name ?? 'U'" size="sm" />
      </button>
    </template>
    <div class="w-64 space-y-2">
      <div class="flex gap-3 rounded-[var(--radius-md)] bg-[var(--muted)] p-2">
        <Avatar :src="panelAvatarSrc" :alt="auth.user?.name ?? t('userMenu.guestName')" :fallback="auth.user?.name ?? 'U'" size="md" />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-[var(--foreground)]">{{ auth.user?.name ?? t('userMenu.guestName') }}</p>
          <p class="text-xs text-[var(--muted-foreground)]">{{ auth.user?.email ?? t('userMenu.guestEmail') }}</p>
        </div>
      </div>
      <button type="button" class="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]">
        <User class="h-4 w-4" />
        <span>{{ t('userMenu.profile') }}</span>
      </button>
      <button type="button" class="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]">
        <Settings class="h-4 w-4" />
        <span>{{ t('userMenu.settings') }}</span>
      </button>
      <div class="rounded-[var(--radius-sm)] border border-[var(--border)] p-1">
        <div class="mb-1 inline-flex items-center gap-2 px-1 text-xs text-[var(--muted-foreground)]">
          <component :is="resolvedThemeIcon" class="h-3.5 w-3.5" />
          <span>{{ t('userMenu.theme') }}</span>
        </div>
        <ThemeToggle variant="menu" />
      </div>
      <Button variant="ghost" size="sm" class="w-full justify-start" @click="logout">
        <LogOut class="h-4 w-4" />
        <span>{{ t('userMenu.logout') }}</span>
      </Button>
    </div>
  </Popover>
</template>
