<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  openDelay?: number
  closeDelay?: number
}>(), {
  openDelay: 300,
  closeDelay: 150,
})

const open = ref(false)
let openTimer: number | undefined
let closeTimer: number | undefined

function onEnter() {
  window.clearTimeout(closeTimer)
  openTimer = window.setTimeout(() => { open.value = true }, props.openDelay)
}

function onLeave() {
  window.clearTimeout(openTimer)
  closeTimer = window.setTimeout(() => { open.value = false }, props.closeDelay)
}
</script>

<template>
  <div class="relative inline-flex" @mouseenter="onEnter" @mouseleave="onLeave">
    <slot name="trigger" />
    <div v-if="open" class="absolute left-0 top-full z-40 mt-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--shadow-md)]">
      <slot />
    </div>
  </div>
</template>
