<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Dialog from '@/components/ui/Dialog.vue'

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

function cancel() {
  emit('cancel')
  emit('update:open', false)
}

function confirm() {
  emit('confirm')
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" :title="title" :description="description" @update:open="emit('update:open', $event)">
    <template v-if="$slots.description" #default>
      <slot name="description" />
    </template>
    <template #footer>
      <slot name="actions">
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="cancel">{{ cancelText }}</Button>
          <Button :variant="variant === 'destructive' ? 'destructive' : 'primary'" @click="confirm">{{ confirmText }}</Button>
        </div>
      </slot>
    </template>
  </Dialog>
</template>
