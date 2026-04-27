<script lang="ts">
export default {}
</script>

<script setup lang="ts">
import Breadcrumbs from '@/components/app/Breadcrumbs.vue'
</script>

<template>
  <header class="flex h-14 items-center justify-between gap-4 bg-[var(--topbar-bg)] px-4 text-[var(--topbar-text)]">
    <div class="flex items-center gap-4">
        <slot name="collapse-sidebar" />
        <slot name="leading" />
        <Breadcrumbs />
    </div>

    <slot name="actions" />
  </header>
</template>
