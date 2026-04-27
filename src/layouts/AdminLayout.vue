<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import type { Component, ComputedRef } from 'vue'
import { storeToRefs } from 'pinia'
import Topbar from '@/components/app/Topbar.vue'
import SidebarNav from '@/components/app/SidebarNav.vue'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/ui'
import { CircleArrowLeft, CircleArrowRight, Menu } from 'lucide-vue-next'

const uiStore = useUiStore()
const { collapsed, mobileOpen } = storeToRefs(uiStore)
const collapseSidebarIcon: ComputedRef<Component> = computed(() => {
  return collapsed.value ? CircleArrowRight : CircleArrowLeft
})
</script>

<template>
  <div class="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
    <div class="flex min-h-dvh">
      <aside
        class="hidden shrink-0 bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] md:flex md:flex-col"
        :class="cn(collapsed ? 'w-16' : 'w-64')"
      >
        <SidebarNav :collapsed="collapsed" @update:collapsed="collapsed = $event" />
      </aside>

      <div class="flex min-w-0 flex-1 flex-col">
        <Topbar>
          <template #collapse-sidebar>
            
            <button
            class="rounded-md p-2 text-[var(--sidebar-text)]/80 hover:bg-[var(--sidebar-bg)]/10 hover:text-[var(--sidebar-text)]"
            type="button"
            @click="collapsed = !collapsed"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          >
            <span class="text-xs"><component :is="collapseSidebarIcon" class="h-4 w-4" /></span>
          </button>
          </template>
          <template #leading>
            <button
              class="rounded-md p-2 text-[var(--sidebar-text)]/80 hover:bg-[var(--sidebar-bg)]/10 hover:text-[var(--sidebar-text)] md:hidden"
              type="button"
              @click="mobileOpen = true"
              aria-label="Open menu"
            >
              <span class="text-xs"><Menu class="h-4 w-4" /></span>
            </button>
          </template>
          <template #actions>
            <slot name="topbar-actions" />
          </template>
        </Topbar>

        <main class="min-w-0 flex-1 p-4 bg-[var(--card)]">
          <RouterView />
        </main>
      </div>
    </div>

    <div v-if="mobileOpen" class="fixed inset-0 z-50 md:hidden">
      <button class="absolute inset-0 bg-[var(--overlay)]" type="button" @click="mobileOpen = false" aria-label="Close menu" />
      <div class="absolute inset-y-0 left-0 w-72 bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]">
        <div class="flex h-14 items-center justify-between px-3">
          <span class="font-semibold text-[var(--sidebar-text)]">Admin</span>
          <button
            class="rounded-md p-2 text-[var(--sidebar-text)]/80 hover:bg-[var(--sidebar-bg)]/10 hover:text-[var(--sidebar-text)]"
            type="button"
            @click="mobileOpen = false"
            aria-label="Close menu"
          >
            <span class="text-xs">×</span>
          </button>
        </div>
        <SidebarNav :collapsed="false" @update:collapsed="collapsed = $event" />
      </div>
    </div>
  </div>
</template>

