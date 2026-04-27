<script setup lang="ts">
import { computed } from 'vue'
import Label from '@/components/ui/Label.vue'

const props = defineProps<{
  label?: string
  description?: string
  error?: string
  required?: boolean
  id?: string
}>()

const hintId = computed(() => (props.id ? `${props.id}-hint` : undefined))
const errorId = computed(() => (props.id ? `${props.id}-error` : undefined))
const describedBy = computed(() => {
  if (props.error) {
    return errorId.value
  }

  if (props.description && hintId.value) {
    return hintId.value
  }

  return undefined
})
</script>

<template>
  <div class="space-y-1.5">
    <Label v-if="label && id" :for="id" :required="required">{{ label }}</Label>
    <slot :id="id" :describedby="describedBy" />
    <p v-if="error" :id="errorId" role="alert" class="text-sm text-[var(--destructive)]">{{ error }}</p>
    <p v-else-if="description" :id="hintId" class="text-sm text-[var(--muted-foreground)]">{{ description }}</p>
  </div>
</template>
