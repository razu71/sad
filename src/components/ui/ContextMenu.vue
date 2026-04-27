<script setup lang="ts">
import { ref } from 'vue'

type MenuItem = { label: string; onSelect?: () => void }

const props = defineProps<{
  items: MenuItem[]
}>()

const open = ref(false)
const x = ref(0)
const y = ref(0)

function onContextMenu(event: MouseEvent) {
  event.preventDefault()
  x.value = event.clientX
  y.value = event.clientY
  open.value = true
}
</script>

<template>
  <div class="relative" @contextmenu="onContextMenu" @click="open = false">
    <slot />
    <ul v-if="open" role="menu" class="fixed z-50 min-w-40 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-1 shadow-[var(--shadow-md)]" :style="{ left: `${x}px`, top: `${y}px` }">
      <li v-for="item in props.items" :key="item.label">
        <button type="button" role="menuitem" class="block w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]" @click="item.onSelect?.(); open = false">
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>
