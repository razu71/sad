<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  ratio?: number
}>(), {
  ratio: 16 / 9,
})

const style = computed(() => ({ aspectRatio: `${props.ratio}` }))
</script>

<template>
  <div :style="style" class="w-full overflow-hidden rounded-[var(--radius-md)]">
    <slot />
  </div>
</template>
