<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <div>
    <button type="button" class="inline-flex items-center rounded-[var(--radius-sm)] px-2 py-1 text-sm text-[var(--foreground)] hover:bg-[var(--accent)]" :aria-expanded="props.open" @click="emit('update:open', !props.open)">
      <slot name="trigger">Toggle</slot>
    </button>
    <div v-show="props.open" class="mt-2">
      <slot />
    </div>
  </div>
</template>
