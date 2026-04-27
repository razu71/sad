<script setup lang="ts">
import { computed } from 'vue'
import { Check, Monitor, Moon, Sun } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import type { ThemePreference } from '@/stores/ui'
import { useUiStore } from '@/stores/ui'

const props = withDefaults(defineProps<{
  variant?: 'icon' | 'segmented' | 'menu'
}>(), {
  variant: 'icon',
})

const ui = useUiStore()

const themeIcon = computed(() => {
  if (ui.theme === 'system') {
    return Monitor
  }

  return ui.resolvedTheme === 'dark' ? Moon : Sun
})

function setTheme(theme: ThemePreference) {
  ui.setTheme(theme)
}
</script>

<template>
  <Button
    v-if="variant === 'icon'"
    variant="ghost"
    size="icon"
    aria-label="Toggle theme"
    @click="ui.cycleTheme()"
  >
    <component :is="themeIcon" class="h-4 w-4" />
  </Button>
  <div v-else-if="variant === 'segmented'" role="radiogroup" aria-label="Theme" class="inline-flex rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-1">
    <Button variant="ghost" size="sm" :aria-pressed="ui.theme === 'light'" @click="setTheme('light')">Light</Button>
    <Button variant="ghost" size="sm" :aria-pressed="ui.theme === 'dark'" @click="setTheme('dark')">Dark</Button>
    <Button variant="ghost" size="sm" :aria-pressed="ui.theme === 'system'" @click="setTheme('system')">System</Button>
  </div>
  <div v-else class="space-y-1">
    <button type="button" class="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]" @click="setTheme('light')">
      <span class="inline-flex items-center gap-2"><Sun class="h-4 w-4" /> Light</span>
      <Check v-if="ui.theme === 'light'" class="h-4 w-4" />
    </button>
    <button type="button" class="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]" @click="setTheme('dark')">
      <span class="inline-flex items-center gap-2"><Moon class="h-4 w-4" /> Dark</span>
      <Check v-if="ui.theme === 'dark'" class="h-4 w-4" />
    </button>
    <button type="button" class="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]" @click="setTheme('system')">
      <span class="inline-flex items-center gap-2"><Monitor class="h-4 w-4" /> System</span>
      <Check v-if="ui.theme === 'system'" class="h-4 w-4" />
    </button>
  </div>
</template>
