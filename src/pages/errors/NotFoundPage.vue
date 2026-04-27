<script setup lang="ts">
import Button from '@/components/ui/Button.vue'

const dashboardTo = '/admin/dashboard'
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center bg-[var(--background)] p-6 text-[var(--foreground)]">
    <p class="text-sm font-medium text-[var(--muted-foreground)]">404</p>
    <h1 class="mt-2 text-2xl font-semibold">Page not found</h1>
    <p class="mt-2 max-w-sm text-center text-sm text-[var(--muted-foreground)]">The page you requested does not exist or was moved.</p>
    <Button class="mt-6" :to="dashboardTo">Go to dashboard</Button>
  </div>
</template>
