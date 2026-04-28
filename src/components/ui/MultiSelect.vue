<script setup lang="ts">
import { computed } from 'vue'
import VueMultiselect from 'vue-multiselect'
import { cn } from '@/lib/utils'
import 'vue-multiselect/dist/vue-multiselect.css'

export type MultiSelectOption = { label: string; value: string }

const props = withDefaults(
  defineProps<{
    modelValue: string[]
    options: MultiSelectOption[]
    placeholder?: string
    disabled?: boolean
    searchable?: boolean
    /** Keep dropdown open after each pick (default true for multi). */
    closeOnSelect?: boolean
    id?: string
    invalid?: boolean
    class?: string
  }>(),
  {
    placeholder: 'Select…',
    disabled: false,
    searchable: true,
    closeOnSelect: false,
    id: undefined,
    invalid: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const selectedObjects = computed({
  get(): MultiSelectOption[] {
    const chosen = new Set(props.modelValue)
    return props.options.filter((o) => chosen.has(o.value))
  },
  set(next: MultiSelectOption[]) {
    emit(
      'update:modelValue',
      next.map((o) => o.value),
    )
  },
})
</script>

<template>
  <div
    :class="cn(
      'multi-select min-w-0',
      invalid && 'rounded-[var(--radius-md)] ring-2 ring-[var(--destructive)] ring-offset-2 ring-offset-[var(--background)]',
      props.class,
    )"
  >
    <VueMultiselect
      :id="id"
      v-model="selectedObjects"
      :options="options"
      :multiple="true"
      :close-on-select="closeOnSelect"
      :clear-on-select="false"
      :preserve-search="true"
      :disabled="disabled"
      :searchable="searchable"
      :placeholder="placeholder"
      label="label"
      track-by="value"
    />
  </div>
</template>

<style scoped>
.multi-select :deep(.multiselect) {
  min-height: 2.5rem;
  color: var(--foreground);
}
.multi-select :deep(.multiselect__tags) {
  min-height: 2.5rem;
  padding: 0.375rem 2.25rem 0 0.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--input);
  font-size: 0.875rem;
}
.multi-select :deep(.multiselect__input),
.multi-select :deep(.multiselect__single) {
  background: transparent;
  color: var(--foreground);
  font-size: 0.875rem;
}
.multi-select :deep(.multiselect__input::placeholder) {
  color: var(--muted-foreground);
}
.multi-select :deep(.multiselect__tag) {
  margin-bottom: 0.25rem;
  margin-right: 0.375rem;
  padding: 0.25rem 1.5rem 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  background: var(--primary);
  color: var(--primary-foreground);
}
.multi-select :deep(.multiselect__tag-icon::after) {
  color: var(--primary-foreground);
}
.multi-select :deep(.multiselect__tag-icon:hover) {
  background: color-mix(in srgb, var(--primary-foreground) 15%, transparent);
}
.multi-select :deep(.multiselect__placeholder) {
  color: var(--muted-foreground);
  margin-bottom: 0.5rem;
  padding-top: 0.125rem;
}
.multi-select :deep(.multiselect__select) {
  height: 2.375rem;
}
.multi-select :deep(.multiselect__select::before) {
  border-color: var(--muted-foreground) transparent transparent;
}
.multi-select :deep(.multiselect__content-wrapper) {
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  background: var(--card);
  max-height: 15rem;
}
.multi-select :deep(.multiselect__option) {
  color: var(--foreground);
}
.multi-select :deep(.multiselect__option::after) {
  display: none;
}
.multi-select :deep(.multiselect__option--highlight) {
  background: var(--accent);
  color: var(--accent-foreground);
}
.multi-select :deep(.multiselect__option--selected) {
  background: var(--muted);
  color: var(--foreground);
  font-weight: 600;
}
.multi-select :deep(.multiselect__option--selected.multiselect__option--highlight) {
  background: var(--destructive);
  color: var(--destructive-foreground);
}
.multi-select :deep(.multiselect--disabled .multiselect__tags) {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
