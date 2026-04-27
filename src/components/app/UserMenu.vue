<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Settings, User, LogOut, Moon, Sun } from 'lucide-vue-next'
import Avatar from '@/components/ui/Avatar.vue'
import Button from '@/components/ui/Button.vue'
import Popover from '@/components/ui/Popover.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()
const open = ref(false)

const resolvedThemeIcon = computed(() => {
  if (ui.theme === 'dark') {
    return Moon
  }

  if (ui.theme === 'light') {
    return Sun
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Moon : Sun
})

async function logout() {
  auth.clearSession()
  open.value = false
  await router.push('/auth/login')
}
</script>

<template>
  <Popover :open="open" @update:open="open = $event">
    <template #trigger>
      <button type="button" class="inline-flex items-center rounded-full focus-visible:ring-2 focus-visible:ring-[var(--ring)]" aria-label="Open user menu">
        <Avatar :alt="auth.user?.name ?? 'User'" :fallback="auth.user?.name ?? 'U'" size="sm" />
      </button>
    </template>
    <div class="w-64 space-y-2">
      <div class="rounded-[var(--radius-md)] bg-[var(--muted)] p-2">
        <p class="text-sm font-medium text-[var(--foreground)]">{{ auth.user?.name ?? 'Guest User' }}</p>
        <p class="text-xs text-[var(--muted-foreground)]">{{ auth.user?.email ?? 'guest@example.com' }}</p>
      </div>
      <button type="button" class="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]">
        <User class="h-4 w-4" />
        <span>Profile</span>
      </button>
      <button type="button" class="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]">
        <Settings class="h-4 w-4" />
        <span>Settings</span>
      </button>
      <div class="rounded-[var(--radius-sm)] border border-[var(--border)] p-1">
        <div class="mb-1 inline-flex items-center gap-2 px-1 text-xs text-[var(--muted-foreground)]">
          <component :is="resolvedThemeIcon" class="h-3.5 w-3.5" />
          <span>Theme</span>
        </div>
        <ThemeToggle variant="menu" />
      </div>
      <Button variant="ghost" size="sm" class="w-full justify-start" @click="logout">
        <LogOut class="h-4 w-4" />
        <span>Logout</span>
      </Button>
    </div>
  </Popover>
</template>
