<script setup lang="ts">
import Typography from '@/components/ui/Typography.vue'

defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <header class="mb-4 flex items-start justify-between gap-3">
    <div class="min-w-0">
      <Typography as="h1" variant="h1" class="truncate">{{ title }}</Typography>
      <Typography v-if="description" as="p" variant="muted" class="mt-1">{{ description }}</Typography>
    </div>
    <div v-if="$slots.actions" class="shrink-0">
      <slot name="actions" />
    </div>
  </header>
</template>
