<script setup lang="ts">
import { provide } from 'vue'

const props = defineProps<{
  dir: 'ltr' | 'rtl'
}>()

provide('ui-direction', props.dir)
</script>

<template>
  <div :dir="dir">
    <slot />
  </div>
</template>
