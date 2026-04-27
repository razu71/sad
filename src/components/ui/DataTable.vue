<script setup lang="ts" generic="T extends Record<string, unknown>">
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from '@tanstack/vue-table'
import { useVueTable, FlexRender } from '@tanstack/vue-table'
import { computed, ref, watch, unref } from 'vue'
import Empty from '@/components/ui/Empty.vue'
import Pagination from '@/components/ui/Pagination.vue'
import Skeleton from '@/components/ui/Skeleton.vue'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<T, unknown>[]
    data: T[] | ReadonlyArray<T>
    pageCount?: number
    pagination?: boolean
    sorting?: boolean
    pageSize?: number
    loading?: boolean
    empty?: { title: string; description?: string }
  }>(),
  {
    pageCount: undefined,
    pagination: true,
    sorting: true,
    pageSize: 10,
    loading: false,
    empty: () => ({ title: 'No records', description: '' }),
  },
)

const emit = defineEmits<{
  'page-change': [value: number]
  'page-size-change': [value: number]
  'sort-change': [value: SortingState]
}>()

const sortingState = ref<SortingState>([])

const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: props.pageSize,
})

const rowList = computed(() => (unref(props.data) as T[]) ?? [])

const rowCount = computed(() => rowList.value.length)

watch(
  () => props.pageSize,
  (ps) => {
    if (props.pagination) {
      pagination.value = { pageSize: ps, pageIndex: 0 }
    }
  },
)

watch(
  [rowCount, () => props.pagination],
  () => {
    if (props.pagination) {
      return
    }
    const n = Math.max(rowCount.value, 1)
    pagination.value = { pageIndex: 0, pageSize: n }
  },
  { immediate: true },
)

watch(
  () => rowCount.value,
  (n) => {
    if (n === 0) {
      pagination.value = { ...pagination.value, pageIndex: 0 }
    }
  },
)

const showFooter = computed(() => Boolean(props.pagination) && !props.loading && rowCount.value > 0)

const table = useVueTable<T>({
  get data() {
    return rowList.value.slice() as T[]
  },
  get columns() {
    return props.columns
  },
  get state() {
    return { sorting: sortingState.value, pagination: pagination.value }
  },
  onSortingChange: (up) => {
    if (!props.sorting) {
      return
    }
    const next = typeof up === 'function' ? (up as (o: SortingState) => SortingState)(sortingState.value) : up
    sortingState.value = next
    emit('sort-change', next)
  },
  onPaginationChange: (up) => {
    const next = typeof up === 'function' ? (up as (o: PaginationState) => PaginationState)(pagination.value) : up
    pagination.value = next
    if (props.pagination) {
      emit('page-change', next.pageIndex + 1)
      emit('page-size-change', next.pageSize)
    }
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  manualPagination: typeof props.pageCount === 'number',
  get pageCount() {
    return props.pageCount
  },
  defaultColumn: {
    enableSorting: false,
  },
})
</script>

<template>
  <div class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]">
    <div v-if="$slots.toolbar" class="border-b border-[var(--border)] px-3 py-2">
      <slot name="toolbar" />
    </div>
    <div class="overflow-x-auto">
      <div v-if="loading" class="space-y-2 p-3">
        <Skeleton class="h-9 w-full" />
        <Skeleton class="h-9 w-full" />
        <Skeleton class="h-9 w-full" />
      </div>
      <template v-else>
        <table
          v-if="rowCount"
          class="w-full border-collapse text-sm"
        >
          <thead>
            <tr
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
              class="border-b border-[var(--border)] bg-[var(--muted)]/30 text-left text-xs font-medium text-[var(--muted-foreground)]"
            >
              <th
                v-for="header in headerGroup.headers"
                :key="header.id"
                class="px-3 py-2 align-middle"
                :class="[header.column.getCanSort() && sorting ? 'cursor-pointer select-none' : '']"
                @click="header.column.getCanSort() && sorting ? header.column.getToggleSortingHandler()?.($event) : undefined"
              >
                <div class="inline-flex items-center gap-1">
                  <span v-if="!header.isPlaceholder" class="inline">
                    <FlexRender
                      v-if="header.column.columnDef.header"
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                    />
                  </span>
                  <span
                    v-if="header.column.getIsSorted() === 'asc'"
                    class="text-[var(--foreground)]"
                    aria-hidden="true"
                  >↑</span>
                  <span
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    class="text-[var(--foreground)]"
                    aria-hidden="true"
                  >↓</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              class="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--muted)]/20"
            >
              <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="px-3 py-2 align-middle text-[var(--foreground)]"
              >
                <FlexRender
                  v-if="cell.column.columnDef.cell"
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
                <span v-else class="text-[var(--muted-foreground)]">—</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="p-2">
          <slot name="empty">
            <Empty :title="empty.title" :description="empty.description" />
          </slot>
        </div>
      </template>
    </div>
    <div
      v-if="showFooter"
      class="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] px-3 py-2"
    >
      <p class="text-xs text-[var(--muted-foreground)]">
        Page {{ (table.getState().pagination?.pageIndex ?? 0) + 1 }} of {{ Math.max(1, table.getPageCount()) }}
      </p>
      <Pagination
        :page="(table.getState().pagination?.pageIndex ?? 0) + 1"
        :page-size="table.getState().pagination?.pageSize ?? props.pageSize"
        :total="rowCount"
        @update:page="(p) => { table.setPageIndex(p - 1) }"
      />
    </div>
  </div>
</template>
