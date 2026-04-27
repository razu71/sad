<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    align?: 'start' | 'center' | 'end'
    side?: 'top' | 'right' | 'bottom' | 'left'
    offset?: number
  }>(),
  {
    align: 'start',
    side: 'bottom',
    offset: 8,
  },
)

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const root = ref<HTMLElement | null>(null)
const anchorRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({ top: '0px', left: '0px' })

let scrollOrResize: (() => void) | null = null

function isInside(eventTarget: Event['target']): boolean {
  if (!(eventTarget instanceof Node)) {
    return false
  }
  if (root.value?.contains(eventTarget)) {
    return true
  }
  if (panelRef.value?.contains(eventTarget)) {
    return true
  }
  return false
}

function updatePosition() {
  if (!props.open) {
    return
  }
  const a = anchorRef.value
  if (!a) {
    return
  }
  const r = a.getBoundingClientRect()
  const o = props.offset
  const p = panelRef.value
  const pw = p?.offsetWidth ?? 192
  const ph = p?.offsetHeight ?? 0
  const m = 8
  const vw = window.innerWidth
  const vh = window.innerHeight
  let top = 0
  let left = 0
  if (props.side === 'bottom') {
    top = r.bottom + o
    if (props.align === 'end') {
      left = r.right - pw
    } else if (props.align === 'center') {
      left = r.left + r.width / 2 - pw / 2
    } else {
      left = r.left
    }
  } else if (props.side === 'top') {
    const h = ph || 0
    top = h ? r.top - o - h : r.top - o - 200
    if (props.align === 'end') {
      left = r.right - pw
    } else if (props.align === 'center') {
      left = r.left + r.width / 2 - pw / 2
    } else {
      left = r.left
    }
  } else if (props.side === 'right') {
    left = r.right + o
    if (props.align === 'end') {
      top = r.bottom - ph
    } else if (props.align === 'center') {
      top = r.top + r.height / 2 - ph / 2
    } else {
      top = r.top
    }
  } else {
    left = r.left - o - pw
    if (props.align === 'end') {
      top = r.bottom - ph
    } else if (props.align === 'center') {
      top = r.top + r.height / 2 - ph / 2
    } else {
      top = r.top
    }
  }
  left = Math.max(m, Math.min(left, vw - Math.max(pw, 80) - m))
  top = Math.max(m, Math.min(top, vh - Math.max(ph, 40) - m))
  panelStyle.value = { top: `${top}px`, left: `${left}px` }
}

function onDocClick(event: MouseEvent) {
  if (!props.open) {
    return
  }
  if (!isInside(event.target)) {
    emit('update:open', false)
  }
}

function onKeydown(event: KeyboardEvent) {
  if (props.open && event.key === 'Escape') {
    emit('update:open', false)
  }
}

function schedulePosition() {
  nextTick(() => {
    updatePosition()
    requestAnimationFrame(() => {
      updatePosition()
    })
  })
}

function tearDownScroll() {
  if (scrollOrResize) {
    document.removeEventListener('scroll', scrollOrResize, true)
    window.removeEventListener('resize', scrollOrResize)
    scrollOrResize = null
  }
}

watch(
  () => [props.open, props.align, props.side, props.offset] as const,
  () => {
    if (props.open) {
      if (!scrollOrResize) {
        scrollOrResize = () => {
          updatePosition()
        }
        document.addEventListener('scroll', scrollOrResize, true)
        window.addEventListener('resize', scrollOrResize)
      }
      schedulePosition()
    } else {
      tearDownScroll()
    }
  },
  { flush: 'post', immediate: true },
)

onMounted(() => {
  document.addEventListener('mousedown', onDocClick)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', onDocClick)
  window.removeEventListener('keydown', onKeydown)
  tearDownScroll()
})
</script>

<template>
  <div ref="root" class="inline-block">
    <span ref="anchorRef" @click="emit('update:open', !open)">
      <slot name="trigger" />
    </span>
  </div>
  <Teleport to="body">
    <div
      v-if="open"
      ref="panelRef"
      class="pointer-events-auto fixed z-[200] min-w-48 max-h-[min(24rem,70vh)] overflow-y-auto overflow-x-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--card-foreground)] shadow-[var(--shadow-lg)]"
      :style="panelStyle"
    >
      <slot />
    </div>
  </Teleport>
</template>
