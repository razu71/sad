<script setup lang="ts">
import { computed, ref } from 'vue'
import Calendar from '@/components/ui/Calendar.vue'
import Popover from '@/components/ui/Popover.vue'
import { formatDate } from '@/lib/utils'

const props = defineProps<{
  modelValue?: Date | null
  min?: Date
  max?: Date
  placeholder?: string
  format?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const open = ref(false)
const text = computed(() => props.modelValue ? formatDate(props.modelValue) : (props.placeholder ?? 'Select date'))

function update(value: Date | null) {
  emit('update:modelValue', value)
  open.value = false
}
</script>

<template>
  <Popover :open="open" @update:open="open = $event">
    <template #trigger>
      <button type="button" class="h-10 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-[var(--foreground)]">
        {{ text }}
      </button>
    </template>
    <Calendar :model-value="modelValue" :min="min" :max="max" @update:model-value="update" />
  </Popover>
</template>
