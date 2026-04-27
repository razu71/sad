<script setup lang="ts">
import AlertDialog from '@/components/ui/AlertDialog.vue'

withDefaults(defineProps<{
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}>(), {
  variant: 'default',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()
</script>

<template>
  <AlertDialog
    :open="open"
    :title="title"
    :description="description"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :variant="variant"
    @update:open="emit('update:open', $event)"
    @confirm="emit('confirm')"
  />
</template>
