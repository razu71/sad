<script lang="ts">
export default {}
</script>

<script setup lang="ts">
import Breadcrumbs from '@/components/app/Breadcrumbs.vue'
</script>

<template>
  <header class="flex h-14 items-center justify-between gap-4 border-b border-[var(--topbar-border)] bg-[var(--topbar-bg)] px-4 text-[var(--topbar-text)]">
    <slot name="leading" />
    <Breadcrumbs />
    <slot name="actions" />
  </header>
</template>
