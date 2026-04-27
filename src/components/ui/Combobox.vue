<script setup lang="ts">
import { computed, ref } from 'vue'

type Option = { label: string; value: string }

const props = withDefaults(defineProps<{
  modelValue: string | string[]
  options: Option[]
  placeholder?: string
  loading?: boolean
  multiple?: boolean
}>(), {
  placeholder: 'Search...',
  loading: false,
  multiple: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  search: [value: string]
}>()

const query = ref('')
const open = ref(false)
const activeIndex = ref(-1)

const filtered = computed(() => props.options.filter((option) => option.label.toLowerCase().includes(query.value.toLowerCase())))

function select(value: string) {
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    emit('update:modelValue', current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value])
  } else {
    emit('update:modelValue', value)
    open.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    open.value = true
    activeIndex.value = Math.min(filtered.value.length - 1, activeIndex.value + 1)
  } else if (event.key === 'ArrowUp') {
    activeIndex.value = Math.max(0, activeIndex.value - 1)
  } else if (event.key === 'Enter' && open.value && filtered.value[activeIndex.value]) {
    const selected = filtered.value[activeIndex.value]
    if (selected) {
      select(selected.value)
    }
  } else if (event.key === 'Escape') {
    open.value = false
  }
}
</script>

<template>
  <div class="relative">
    <input
      :value="query"
      role="combobox"
      :placeholder="placeholder"
      :aria-expanded="open"
      :aria-activedescendant="activeIndex >= 0 ? `combo-${activeIndex}` : undefined"
      class="h-10 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      @focus="open = true"
      @input="query = ($event.target as HTMLInputElement).value; emit('search', query)"
      @keydown="onKeydown"
    >
    <ul v-if="open" class="absolute z-40 mt-1 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-1">
      <li v-if="loading" class="px-2 py-2 text-sm text-[var(--muted-foreground)]">Loading...</li>
      <li v-for="(option, idx) in filtered" :id="`combo-${idx}`" :key="option.value">
        <button type="button" class="block w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]" @click="select(option.value)">
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>
