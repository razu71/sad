<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLogo from '@/components/app/AppLogo.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'

const year = new Date().getFullYear()
const brand = 'Sad'
</script>

<template>
  <div class="relative flex min-h-dvh flex-col bg-[var(--background)] text-[var(--foreground)]">
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10" aria-hidden="true" />
    <header class="relative z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-4 py-3">
      <AppLogo :collapsed="false" to="/auth/login" />
      <ThemeToggle variant="icon" />
    </header>
    <main class="relative z-10 flex flex-1 items-center justify-center p-6">
      <div class="w-full max-w-md">
        <RouterView />
      </div>
    </main>
    <footer class="relative z-10 border-t border-[var(--border)] bg-[var(--card)] px-4 py-3 text-center text-sm text-[var(--muted-foreground)]">
      © {{ year }} {{ brand }}. All rights reserved.
    </footer>
  </div>
</template>
