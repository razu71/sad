<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  side: 'left' | 'right' | 'top' | 'bottom'
  size?: string
}>(), {
  side: 'left',
  size: '20rem',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function close() {
  emit('update:open', false)
}

function onKeydown(event: KeyboardEvent) {
  if (props.open && event.key === 'Escape') {
    close()
  }
}

const panelClass = computed(() => ({
  left: 'inset-y-0 left-0',
  right: 'inset-y-0 right-0',
  top: 'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0',
}[props.side]))

const panelStyle = computed(() => props.side === 'left' || props.side === 'right' ? { width: props.size } : { height: props.size })

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <button type="button" class="absolute inset-0 bg-[var(--overlay)]" aria-label="Close drawer" @click="close" />
      <aside :class="['absolute border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-[var(--shadow-lg)]', panelClass]" :style="panelStyle">
        <header v-if="$slots.header" class="border-b border-[var(--border)] p-3">
          <slot name="header" />
        </header>
        <div class="p-3">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="border-t border-[var(--border)] p-3">
          <slot name="footer" />
        </footer>
      </aside>
    </div>
  </Teleport>
</template>
