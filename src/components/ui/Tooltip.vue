<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    content: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    delay?: number
  }>(),
  {
    side: 'top',
    delay: 150,
  },
)

const open = ref(false)
let timer: number | undefined
const id = `tooltip-${Math.random().toString(36).slice(2, 9)}`

const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({ top: '0px', left: '0px' })

let scrollOrResize: (() => void) | null = null

function updatePosition() {
  if (!open.value || !rootRef.value) {
    return
  }
  const r = rootRef.value.getBoundingClientRect()
  const p = panelRef.value
  const tw = p?.offsetWidth ?? 0
  const th = p?.offsetHeight ?? 0
  const m = 8
  const vw = window.innerWidth
  const vh = window.innerHeight
  let left = 0
  let top = 0
  if (props.side === 'right') {
    left = r.right + m
    top = r.top + r.height / 2 - th / 2
  } else if (props.side === 'left') {
    left = r.left - m - (tw || 0)
    top = r.top + r.height / 2 - th / 2
  } else if (props.side === 'top') {
    left = r.left + r.width / 2 - (tw || 0) / 2
    top = r.top - m - (th || 0)
  } else {
    left = r.left + r.width / 2 - (tw || 0) / 2
    top = r.bottom + m
  }
  left = Math.max(m, Math.min(left, vw - Math.max(tw, 1) - m))
  top = Math.max(m, Math.min(top, vh - Math.max(th, 1) - m))
  panelStyle.value = { top: `${top}px`, left: `${left}px` }
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
  () => open.value,
  (v) => {
    if (v) {
      if (!scrollOrResize) {
        scrollOrResize = () => {
          if (open.value) {
            updatePosition()
          }
        }
        document.addEventListener('scroll', scrollOrResize, true)
        window.addEventListener('resize', scrollOrResize)
      }
      schedulePosition()
    } else {
      tearDownScroll()
    }
  },
  { flush: 'post' },
)

function show() {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    open.value = true
  }, props.delay)
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

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  tearDownScroll()
})
</script>

<template>
  <span
    ref="rootRef"
    class="inline-flex"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <span :aria-describedby="open ? id : undefined">
      <slot name="trigger" />
    </span>
  </span>
  <Teleport to="body">
    <span
      v-if="open"
      :id="id"
      ref="panelRef"
      role="tooltip"
      class="pointer-events-none fixed z-[200] whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--foreground)] px-2 py-1 text-xs text-[var(--card)]"
      :style="panelStyle"
    >
      <slot name="content">{{ content }}</slot>
    </span>
  </Teleport>
</template>
