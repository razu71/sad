<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
}>(), {
  size: 'md',
  closeOnOverlay: true,
  closeOnEsc: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function close() {
  emit('update:open', false)
}

function onKeydown(event: KeyboardEvent) {
  if (props.open && props.closeOnEsc && event.key === 'Escape') {
    close()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <button class="absolute inset-0 bg-[var(--overlay)]" type="button" aria-label="Close dialog" @click="closeOnOverlay ? close() : null" />
      <section
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'dialog-title' : undefined"
        :aria-describedby="description ? 'dialog-description' : undefined"
        :class="['absolute left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-4 text-[var(--card-foreground)] shadow-[var(--shadow-lg)]', size === 'sm' && 'max-w-sm', size === 'lg' && 'max-w-2xl', size === 'xl' && 'max-w-4xl', size === 'full' && 'h-[95vh] w-[95vw] max-w-none']"
      >
        <header v-if="$slots.header || title || description" class="mb-3">
          <slot name="header">
            <h2 v-if="title" id="dialog-title" class="text-lg font-semibold">{{ title }}</h2>
            <p v-if="description" id="dialog-description" class="mt-1 text-sm text-[var(--muted-foreground)]">{{ description }}</p>
          </slot>
        </header>
        <slot />
        <footer v-if="$slots.footer" class="mt-4">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>
