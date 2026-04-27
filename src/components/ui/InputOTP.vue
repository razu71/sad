<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  length?: number
}>(), {
  length: 6,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const values = ref<string[]>([])
watch(() => props.modelValue, (value) => {
  values.value = value.padEnd(props.length, ' ').slice(0, props.length).split('').map((char) => char.trim())
}, { immediate: true })

const slots = computed(() => Array.from({ length: props.length }, (_unused, idx) => idx))

function update(index: number, value: string) {
  const chars = [...values.value]
  chars[index] = value.slice(-1)
  const joined = chars.join('')
  emit('update:modelValue', joined)
  if (joined.length === props.length && !joined.includes('')) {
    emit('complete', joined)
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      v-for="idx in slots"
      :key="idx"
      :value="values[idx]"
      inputmode="numeric"
      maxlength="1"
      class="h-10 w-10 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] text-center text-sm text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      @input="update(idx, ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>
