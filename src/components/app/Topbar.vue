<script lang="ts">
export default {}
</script>

<script setup lang="ts">
import Breadcrumbs from './Breadcrumbs.vue'
</script>

<template>
  <header class="flex h-14 items-center justify-between gap-4 border-b border-white/10 bg-[var(--topbar-bg)] px-4">
    <slot name="leading" />
    <Breadcrumbs />
    <slot name="actions" />
  </header>
</template>
