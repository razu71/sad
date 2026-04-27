<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/Button.vue'

const props = withDefaults(defineProps<{
  page: number
  pageSize: number
  total: number
  siblingCount?: number
}>(), {
  siblingCount: 1,
})

const emit = defineEmits<{
  'update:page': [value: number]
  'update:pageSize': [value: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const pages = computed(() => Array.from({ length: totalPages.value }, (_unused, idx) => idx + 1))
</script>

<template>
  <nav aria-label="Pagination" class="flex items-center gap-2">
    <Button variant="outline" size="sm" :disabled="page <= 1" @click="emit('update:page', page - 1)">Prev</Button>
    <Button
      v-for="p in pages"
      :key="p"
      :variant="p === page ? 'primary' : 'outline'"
      size="sm"
      :aria-current="p === page ? 'page' : undefined"
      @click="emit('update:page', p)"
    >
      {{ p }}
    </Button>
    <Button variant="outline" size="sm" :disabled="page >= totalPages" @click="emit('update:page', page + 1)">Next</Button>
    <slot name="info" />
  </nav>
</template>
