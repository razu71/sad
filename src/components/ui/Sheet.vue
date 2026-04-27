<script setup lang="ts">
import Drawer from '@/components/ui/Drawer.vue'

defineProps<{
  open: boolean
  side: 'left' | 'right' | 'top' | 'bottom'
  size?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <Drawer :open="open" :side="side" :size="size" @update:open="emit('update:open', $event)">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Drawer>
</template>
