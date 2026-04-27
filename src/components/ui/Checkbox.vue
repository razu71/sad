<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  id?: string
}>(), {
  id: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const checkboxId = computed(() => props.id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`)

function syncIndeterminate() {
  if (inputRef.value) {
    inputRef.value.indeterminate = Boolean(props.indeterminate)
  }
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}

onMounted(syncIndeterminate)
watch(() => props.indeterminate, syncIndeterminate)
</script>

<template>
  <label :for="checkboxId" class="inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--foreground)]">
    <input
      :id="checkboxId"
      ref="inputRef"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      class="h-4 w-4 rounded border border-[var(--border)] accent-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      @change="onChange"
    >
    <span v-if="label">{{ label }}</span>
    <slot v-else />
  </label>
</template>
