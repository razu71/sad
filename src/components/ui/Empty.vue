<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  description?: string
  icon?: Component
}>()
</script>

<template>
  <div class="rounded-[var(--radius-md)] border border-dashed border-[var(--border)] bg-[var(--card)] p-6 text-center text-[var(--card-foreground)]">
    <component :is="icon" v-if="icon" class="mx-auto mb-3 h-6 w-6 text-[var(--muted-foreground)]" />
    <p class="text-base font-semibold">{{ title }}</p>
    <p v-if="description" class="mt-1 text-sm text-[var(--muted-foreground)]">{{ description }}</p>
    <div v-if="$slots.actions" class="mt-4">
      <slot name="actions" />
    </div>
  </div>
</template>
