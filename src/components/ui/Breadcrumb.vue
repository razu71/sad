<script setup lang="ts">
import { RouterLink } from 'vue-router'

type Crumb = { label: string; to?: string }

const props = withDefaults(defineProps<{
  items: Crumb[]
  separator?: string
}>(), {
  separator: '/',
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
    <template v-for="(item, idx) in items" :key="`${item.label}-${idx}`">
      <slot v-if="idx > 0" name="separator">
        <span>{{ separator }}</span>
      </slot>
      <slot name="item" :item="item" :index="idx" :is-current="idx === items.length - 1">
        <span v-if="idx === items.length - 1" aria-current="page" class="text-[var(--foreground)]">{{ item.label }}</span>
        <RouterLink v-else-if="item.to" :to="item.to" class="hover:text-[var(--secondary)]">{{ item.label }}</RouterLink>
        <span v-else>{{ item.label }}</span>
      </slot>
    </template>
  </nav>
</template>
