<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import Topbar from '@/components/app/Topbar.vue'
import SidebarNav from '@/components/app/SidebarNav.vue'
import Drawer from '@/components/ui/Drawer.vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { sidebarCollapsed, mobileDrawerOpen } = storeToRefs(ui)

const year = new Date().getFullYear()
const brand = 'Sad'
const version = import.meta.env.VITE_APP_VERSION ?? '0.0.0'
</script>

<template>
  <div class="flex min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
    <aside
      class="hidden shrink-0 border-r border-[var(--border)] bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] transition-[width] duration-200 ease-out md:flex md:flex-col"
      :class="sidebarCollapsed ? 'w-16' : 'w-64'"
    >
      <SidebarNav
        :collapsed="sidebarCollapsed"
        @update:collapsed="ui.setSidebarCollapsed"
        @navigate="ui.closeMobileDrawer"
      />
    </aside>

    <div class="flex min-h-dvh min-w-0 flex-1 flex-col">
      <Topbar class="shrink-0" />
      <main class="min-h-0 flex-1 overflow-y-auto bg-[var(--background)] p-4 md:p-6">
        <RouterView />
      </main>
      <footer class="shrink-0 flex flex-col gap-1 border-t border-[var(--topbar-border)] bg-[var(--footer-bg)] px-4 py-3 text-sm text-[var(--footer-text)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {{ year }} {{ brand }}. All rights reserved.</span>
        <span class="sm:text-right">v{{ version }}</span>
      </footer>
    </div>

    <Drawer v-model:open="mobileDrawerOpen" side="left" size="18rem">
      <SidebarNav
        :collapsed="false"
        @update:collapsed="ui.setSidebarCollapsed"
        @navigate="ui.closeMobileDrawer"
      />
    </Drawer>
  </div>
</template>
