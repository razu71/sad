<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
}>(), {
  side: 'top',
  delay: 150,
})

const open = ref(false)
let timer: number | undefined
const id = `tooltip-${Math.random().toString(36).slice(2, 9)}`

const sideClass = computed(() => ({
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
}[props.side]))

function show() {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => { open.value = true }, props.delay)
}

function hide() {
  window.clearTimeout(timer)
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    hide()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <span class="relative inline-flex" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="hide">
    <span :aria-describedby="id">
      <slot name="trigger" />
    </span>
    <span v-if="open" :id="id" role="tooltip" :class="['pointer-events-none absolute z-50 whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--foreground)] px-2 py-1 text-xs text-[var(--card)]', sideClass]">
      <slot name="content">{{ content }}</slot>
    </span>
  </span>
</template>
