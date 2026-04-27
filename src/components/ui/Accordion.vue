<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export type AccordionItem = {
  id: string
  title: string
  content: string
}

const props = withDefaults(defineProps<{
  items: AccordionItem[]
  multiple?: boolean
  modelValue?: string | string[]
}>(), {
  multiple: false,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const open = ref<string[]>([])

watch(() => props.modelValue, (value) => {
  open.value = Array.isArray(value) ? value : value ? [value] : []
}, { immediate: true })

const openSet = computed(() => new Set(open.value))

function toggle(id: string) {
  const next = new Set(open.value)
  if (next.has(id)) {
    next.delete(id)
  } else if (props.multiple) {
    next.add(id)
  } else {
    next.clear()
    next.add(id)
  }

  const result = [...next]
  open.value = result
  emit('update:modelValue', props.multiple ? result : (result[0] ?? ''))
}
</script>

<template>
  <div class="space-y-2">
    <div v-for="item in items" :key="item.id" class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)]">
      <button
        type="button"
        class="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-[var(--card-foreground)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        :aria-expanded="openSet.has(item.id)"
        :aria-controls="`accordion-panel-${item.id}`"
        @click="toggle(item.id)"
      >
        <span>{{ item.title }}</span>
        <ChevronDown :class="['h-4 w-4 transition', openSet.has(item.id) ? 'rotate-180' : 'rotate-0']" />
      </button>
      <div v-show="openSet.has(item.id)" :id="`accordion-panel-${item.id}`" role="region" class="px-3 pb-3 text-sm text-[var(--muted-foreground)]">
        <slot :item="item">{{ item.content }}</slot>
      </div>
    </div>
  </div>
</template>
