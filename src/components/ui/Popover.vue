<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
}>(), {
  align: 'start',
  side: 'bottom',
  offset: 8,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const root = ref<HTMLElement | null>(null)

function onDocClick(event: MouseEvent) {
  if (!props.open || !root.value) {
    return
  }

  if (!root.value.contains(event.target as Node)) {
    emit('update:open', false)
  }
}

function onKeydown(event: KeyboardEvent) {
  if (props.open && event.key === 'Escape') {
    emit('update:open', false)
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onDocClick)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', onDocClick)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="relative inline-block">
    <span @click="emit('update:open', !open)">
      <slot name="trigger" />
    </span>
    <div v-if="open" class="absolute z-40 mt-2 min-w-48 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--card-foreground)] shadow-[var(--shadow-md)]">
      <slot />
    </div>
  </div>
</template>
