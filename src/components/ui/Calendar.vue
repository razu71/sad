<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/Button.vue'

const props = withDefaults(defineProps<{
  modelValue?: Date | null
  min?: Date
  max?: Date
  disabledDates?: (d: Date) => boolean
  weekStartsOn?: 0 | 1
}>(), {
  modelValue: null,
  weekStartsOn: 0,
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const today = new Date()
const week = computed(() => Array.from({ length: 7 }, (_unused, idx) => {
  const date = new Date(today)
  date.setDate(today.getDate() - ((today.getDay() - props.weekStartsOn + 7) % 7) + idx)
  return date
}))

function select(date: Date) {
  if ((props.min && date < props.min) || (props.max && date > props.max) || props.disabledDates?.(date)) {
    return
  }

  emit('update:modelValue', date)
}
</script>

<template>
  <div role="grid" class="grid grid-cols-7 gap-1 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-2">
    <Button
      v-for="d in week"
      :key="d.toISOString()"
      size="sm"
      :variant="modelValue && d.toDateString() === modelValue.toDateString() ? 'primary' : 'ghost'"
      role="gridcell"
      :aria-current="d.toDateString() === today.toDateString() ? 'date' : undefined"
      :aria-selected="modelValue && d.toDateString() === modelValue.toDateString()"
      @click="select(d)"
    >
      {{ d.getDate() }}
    </Button>
  </div>
</template>
