<script setup lang="ts">
const props = defineProps<{
  for: string
  required?: boolean
}>()
</script>

<template>
  <label :for="props.for" class="inline-flex items-center gap-1 text-sm font-medium text-[var(--foreground)]">
    <slot />
    <span v-if="props.required" aria-hidden="true" class="text-[var(--destructive)]">*</span>
  </label>
</template>
