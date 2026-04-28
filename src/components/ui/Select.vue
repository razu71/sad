<script setup lang="ts">
import { computed, ref } from 'vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'

type Option = { label: string; value: string }

const props = withDefaults(defineProps<{
  modelValue: string | string[]
  options: Option[]
  placeholder?: string
  multiple?: boolean
  searchable?: boolean
  disabled?: boolean
  invalid?: boolean
}>(), {
  placeholder: 'Select option',
  multiple: false,
  searchable: false,
  disabled: false,
  invalid: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const menuOpen = ref(false)

const label = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    const selected = props.options.filter((option) => props.modelValue.includes(option.value))
    return selected.length ? selected.map((option) => option.label).join(', ') : props.placeholder
  }
  const found = props.options.find((option) => option.value === props.modelValue)
  return found?.label ?? props.placeholder
})

function select(value: string) {
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    emit('update:modelValue', current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value])
    return
  }

  emit('update:modelValue', value)
  menuOpen.value = false
}
</script>

<template>
  <DropdownMenu :open="menuOpen" @update:open="menuOpen = $event">
    <template #trigger>
      <button :disabled="disabled" type="button" :aria-invalid="invalid || undefined" class="h-10 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] px-3 text-left text-sm text-[var(--foreground)]">
        {{ label }}
      </button>
    </template>
    <template #default>
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        role="option"
        class="block w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]"
        @click="select(option.value)"
      >
        {{ option.label }}
      </button>
    </template>
  </DropdownMenu>
</template>
