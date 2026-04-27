<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { ColumnDef } from '@tanstack/vue-table'
import Empty from '@/components/ui/Empty.vue'
import Skeleton from '@/components/ui/Skeleton.vue'

const props = withDefaults(defineProps<{
  columns: ColumnDef<T>[]
  data: T[]
  pagination?: boolean
  sorting?: boolean
  filtering?: boolean
  selection?: 'none' | 'single' | 'multi'
  loading?: boolean
  empty?: { title: string; description?: string }
}>(), {
  pagination: true,
  sorting: true,
  filtering: true,
  selection: 'none',
  loading: false,
  empty: () => ({ title: 'No records', description: '' }),
})

const emit = defineEmits<{
  'selection-change': [rows: T[]]
  'sort-change': [value: unknown]
  'page-change': [value: number]
}>()
</script>

<template>
  <div class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-3">
    <div v-if="$slots.toolbar" class="mb-3">
      <slot name="toolbar" />
    </div>
    <div v-if="loading" class="space-y-2">
      <Skeleton class="h-8 w-full" />
      <Skeleton class="h-8 w-full" />
      <Skeleton class="h-8 w-full" />
    </div>
    <table v-else-if="data.length" class="w-full text-left text-sm">
      <thead>
        <tr>
          <th v-for="(_col, idx) in columns" :key="idx" class="border-b border-[var(--border)] px-2 py-2">
            Column {{ idx + 1 }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_row, ridx) in data" :key="ridx" class="border-b border-[var(--border)] last:border-0">
          <td v-for="(_col, cidx) in columns" :key="cidx" class="px-2 py-2">
            <slot name="cell" :row="_row" :col="_col">-</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <slot v-else name="empty">
      <Empty :title="empty.title" :description="empty.description" />
    </slot>
  </div>
</template>
