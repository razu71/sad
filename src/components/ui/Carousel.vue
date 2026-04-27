<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Button from '@/components/ui/Button.vue'

const props = withDefaults(defineProps<{
  autoplay?: boolean
  interval?: number
  loop?: boolean
}>(), {
  autoplay: false,
  interval: 4000,
  loop: true,
})

const index = ref(0)
let timer: number | undefined

function prev() {
  index.value = props.loop ? Math.max(0, index.value - 1) : index.value - 1
}

function next() {
  index.value = index.value + 1
}

onMounted(() => {
  if (props.autoplay) {
    timer = window.setInterval(next, props.interval)
  }
})
onUnmounted(() => window.clearInterval(timer))
</script>

<template>
  <section aria-roledescription="carousel" class="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-3">
    <slot />
    <div class="mt-3 flex items-center justify-end gap-2">
      <slot name="prev">
        <Button variant="outline" size="sm" aria-label="Previous slide" @click="prev">Prev</Button>
      </slot>
      <slot name="next">
        <Button variant="outline" size="sm" aria-label="Next slide" @click="next">Next</Button>
      </slot>
    </div>
  </section>
</template>
