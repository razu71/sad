<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const homeTo = computed(() => (auth.isAuthenticated ? '/admin/dashboard' : '/auth/login'))
const homeLabel = computed(() => (auth.isAuthenticated ? 'Back to dashboard' : 'Back to sign in'))
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center bg-[var(--background)] p-6 text-[var(--foreground)]">
    <p class="text-5xl font-bold tabular-nums text-[var(--muted-foreground)]">404</p>
    <h1 class="mt-4 text-2xl font-semibold">Page not found</h1>
    <p class="mt-2 max-w-md text-center text-sm text-[var(--muted-foreground)]">The page you requested does not exist or was moved.</p>
    <Button class="mt-8" :to="homeTo">{{ homeLabel }}</Button>
  </div>
</template>
