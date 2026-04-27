<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()
</script>

<template>
  <aside :class="['h-full border-r border-[var(--border)] bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] transition-all', collapsed ? 'w-16' : 'w-64']">
    <header v-if="$slots.header" class="border-b border-[var(--border)] p-2">
      <slot name="header" :toggle="() => emit('update:collapsed', !collapsed)" />
    </header>
    <div class="p-2">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="border-t border-[var(--border)] p-2">
      <slot name="footer" />
    </footer>
  </aside>
</template>
