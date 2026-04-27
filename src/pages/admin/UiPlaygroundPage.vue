<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div class="rounded-lg p-6 shadow-sm">
    <div class="flex items-center justify-between gap-4">
      <div class="min-w-0">
        <h1 class="truncate text-xl font-semibold">UI playground</h1>
        <p class="mt-1 text-sm opacity-80">Preview primitives and composed components (Phase 9 expands this).</p>
      </div>
      <Button variant="outline">Sample control</Button>
    </div>
  </div>
</template>
