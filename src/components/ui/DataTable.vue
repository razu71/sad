<script setup lang="ts" generic="T extends Record<string, unknown>">
/**
 * DataTable — TanStack Table v8 for Vue.
 * Row pipeline: core → filtered → grouped → sorted → expanded → paginated
 * @see https://tanstack.com/table/latest/docs/framework/vue
 */
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  FlexRender,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type ExpandedState,
  type GroupingState,
  type PaginationState,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  type Updater,
} from '@tanstack/vue-table'
import { computed, h, ref, unref, watch } from 'vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Empty from '@/components/ui/Empty.vue'
import Input from '@/components/ui/Input.vue'
import Pagination from '@/components/ui/Pagination.vue'
import Skeleton from '@/components/ui/Skeleton.vue'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<T, unknown>[]
    data: T[] | ReadonlyArray<T>
    /** Server-side: total row count when using manual pagination */
    pageCount?: number
    /** Client pagination UI + row chunking */
    pagination?: boolean
    /** Column sorting (client unless manualSorting) */
    sorting?: boolean
    pageSize?: number
    loading?: boolean
    empty?: { title: string; description?: string }
    /** Enable TanStack column filters state (set columnDef filterFn / enableColumnFilter) */
    columnFilters?: boolean
    /** Enable global filter (string match across columns with enableGlobalFilter !== false) */
    globalFilter?: boolean
    /** Controlled global filter (optional; syncs with internal when set) */
    globalFilterValue?: string
    /** Show search input bound to global filter (needs globalFilter: true) */
    showGlobalFilter?: boolean
    /** none | single | multi — prepends a selection column when not none */
    rowSelection?: 'none' | 'single' | 'multi'
    /** Tree / nested rows: return child rows from each row */
    getSubRows?: (row: T) => T[] | undefined
    /** Stable row id (default uses row id field or index) */
    rowIdKey?: keyof T
    /** @tanstack: manual flags for server-driven data */
    manualPagination?: boolean
    manualFiltering?: boolean
    manualSorting?: boolean
    manualGrouping?: boolean
    manualExpanding?: boolean
    /** Pass-through to table.options.meta (ColumnDef context.meta) */
    tableMeta?: Record<string, unknown>
  }>(),
  {
    pageCount: undefined,
    pagination: true,
    sorting: true,
    pageSize: 10,
    loading: false,
    empty: () => ({ title: 'No records', description: '' }),
    columnFilters: true,
    globalFilter: true,
    globalFilterValue: undefined,
    showGlobalFilter: false,
    rowSelection: 'none',
    getSubRows: undefined,
    rowIdKey: undefined,
    manualPagination: false,
    manualFiltering: false,
    manualSorting: false,
    manualGrouping: false,
    manualExpanding: false,
    tableMeta: undefined,
  },
)

const emit = defineEmits<{
  'page-change': [value: number]
  'page-size-change': [value: number]
  'sort-change': [value: SortingState]
  'column-filters-change': [value: ColumnFiltersState]
  'global-filter-change': [value: string]
  'row-selection-change': [value: RowSelectionState]
  'column-visibility-change': [value: VisibilityState]
  'column-order-change': [value: ColumnOrderState]
  'column-sizing-change': [value: ColumnSizingState]
  'column-pinning-change': [value: ColumnPinningState]
  'row-pinning-change': [value: RowPinningState]
  'grouping-change': [value: GroupingState]
  'expanded-change': [value: ExpandedState]
  'update:globalFilterValue': [value: string]
}>()

const sortingState = ref<SortingState>([])
const columnFiltersState = ref<ColumnFiltersState>([])
const globalFilterState = ref<string>('')
const columnVisibility = ref<VisibilityState>({})
const columnOrder = ref<ColumnOrderState>([])
const columnPinning = ref<ColumnPinningState>({ left: [], right: [] })
const rowPinning = ref<RowPinningState>({ top: [], bottom: [] })
const rowSelectionState = ref<RowSelectionState>({})
const columnSizing = ref<ColumnSizingState>({})
const grouping = ref<GroupingState>([])
const expanded = ref<ExpandedState>({})

const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: props.pageSize,
})

const rowList = computed(() => (unref(props.data) as T[]) ?? [])

const rowCount = computed(() => rowList.value.length)

const globalFilterText = computed({
  get: () => (props.globalFilterValue !== undefined ? props.globalFilterValue : globalFilterState.value),
  set: (v: string) => {
    if (props.globalFilterValue === undefined) {
      globalFilterState.value = v
    }
    emit('update:globalFilterValue', v)
    emit('global-filter-change', v)
  },
})

watch(
  () => props.globalFilterValue,
  (v) => {
    if (v !== undefined) {
      globalFilterState.value = v
    }
  },
)

function applyUpdater<TState>(u: Updater<TState>, prev: TState): TState {
  return typeof u === 'function' ? (u as (o: TState) => TState)(prev) : u
}

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

const selectColumn: ColumnDef<T, unknown> = {
  id: 'select',
  size: 40,
  enableSorting: false,
  header: ({ table: t }) =>
    h(Checkbox, {
      modelValue: t.getIsAllPageRowsSelected(),
      indeterminate: t.getIsSomePageRowsSelected() && !t.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (v: boolean) => {
        t.toggleAllPageRowsSelected(!!v)
      },
    }),
  cell: ({ row: r }) =>
    h(Checkbox, {
      modelValue: r.getIsSelected(),
      disabled: !r.getCanSelect(),
      'onUpdate:modelValue': (v: boolean) => {
        r.toggleSelected(!!v)
      },
    }),
}

const resolvedColumns = computed<ColumnDef<T, unknown>[]>(() => {
  if (props.rowSelection === 'none') {
    return props.columns
  }
  return [selectColumn, ...props.columns] as ColumnDef<T, unknown>[]
})

function getRowIdFromData(row: T, index: number, parentRow?: { id: string } | undefined) {
  if (props.rowIdKey && row[props.rowIdKey] != null) {
    const id = row[props.rowIdKey] as string | number
    return parentRow ? `${parentRow.id}.${id}` : String(id)
  }
  return parentRow ? `${parentRow.id}.${index}` : String(index)
}

const table = useVueTable<T>({
  get data() {
    return rowList.value.slice() as T[]
  },
  get columns() {
    return resolvedColumns.value
  },
  getRowId: getRowIdFromData,
  getSubRows: props.getSubRows,
  get meta() {
    return (props.tableMeta ?? {}) as Record<string, unknown>
  },
  get state() {
    return {
      sorting: sortingState.value,
      pagination: pagination.value,
      columnFilters: columnFiltersState.value,
      globalFilter: globalFilterText.value,
      columnVisibility: columnVisibility.value,
      columnOrder: columnOrder.value,
      columnPinning: columnPinning.value,
      rowPinning: rowPinning.value,
      rowSelection: rowSelectionState.value,
      columnSizing: columnSizing.value,
      grouping: grouping.value,
      expanded: expanded.value,
    }
  },
  onSortingChange: (up: Updater<SortingState>) => {
    if (!props.sorting) {
      return
    }
    const next = applyUpdater(up, sortingState.value)
    sortingState.value = next
    emit('sort-change', next)
  },
  onPaginationChange: (up: Updater<PaginationState>) => {
    const next = applyUpdater(up, pagination.value)
    pagination.value = next
    if (props.pagination) {
      emit('page-change', next.pageIndex + 1)
      emit('page-size-change', next.pageSize)
    }
  },
  onColumnFiltersChange: (up: Updater<ColumnFiltersState>) => {
    const next = applyUpdater(up, columnFiltersState.value)
    columnFiltersState.value = next
    emit('column-filters-change', next)
  },
  onGlobalFilterChange: (up: Updater<string>) => {
    if (!props.globalFilter) {
      return
    }
    const next = applyUpdater(up, globalFilterText.value) as string
    globalFilterText.value = next
  },
  onColumnVisibilityChange: (up: Updater<VisibilityState>) => {
    const next = applyUpdater(up, columnVisibility.value)
    columnVisibility.value = next
    emit('column-visibility-change', next)
  },
  onColumnOrderChange: (up: Updater<ColumnOrderState>) => {
    const next = applyUpdater(up, columnOrder.value)
    columnOrder.value = next
    emit('column-order-change', next)
  },
  onColumnPinningChange: (up: Updater<ColumnPinningState>) => {
    const next = applyUpdater(up, columnPinning.value)
    columnPinning.value = next
    emit('column-pinning-change', next)
  },
  onRowPinningChange: (up: Updater<RowPinningState>) => {
    const next = applyUpdater(up, rowPinning.value)
    rowPinning.value = next
    emit('row-pinning-change', next)
  },
  onRowSelectionChange: (up: Updater<RowSelectionState>) => {
    if (props.rowSelection === 'none') {
      return
    }
    const next = applyUpdater(up, rowSelectionState.value)
    rowSelectionState.value = next
    emit('row-selection-change', next)
  },
  onColumnSizingChange: (up: Updater<ColumnSizingState>) => {
    const next = applyUpdater(up, columnSizing.value)
    columnSizing.value = next
    emit('column-sizing-change', next)
  },
  onGroupingChange: (up: Updater<GroupingState>) => {
    const next = applyUpdater(up, grouping.value)
    grouping.value = next
    emit('grouping-change', next)
  },
  onExpandedChange: (up: Updater<ExpandedState>) => {
    const next = applyUpdater(up, expanded.value)
    expanded.value = next
    emit('expanded-change', next)
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getGroupedRowModel: getGroupedRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  manualPagination: props.manualPagination,
  manualFiltering: props.manualFiltering,
  manualSorting: props.manualSorting,
  manualGrouping: props.manualGrouping,
  manualExpanding: props.manualExpanding,
  get pageCount() {
    return props.pageCount
  },
  enableGlobalFilter: props.globalFilter,
  enableColumnFilters: props.columnFilters,
  enableColumnResizing: false,
  enableRowSelection: props.rowSelection !== 'none',
  enableMultiRowSelection: props.rowSelection === 'multi',
  enableSubRowSelection: true,
  defaultColumn: {
    enableSorting: false,
  },
} as any)

defineExpose({
  get table() {
    return table
  },
})
</script>

<template>
  <div class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]">
    <div v-if="$slots.toolbar || showGlobalFilter" class="border-b border-[var(--border)] px-3 py-2">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div v-if="showGlobalFilter" class="w-full min-w-0 sm:max-w-sm">
          <Input
            v-model="globalFilterText"
            type="search"
            placeholder="Search table…"
            aria-label="Search table"
          />
        </div>
        <div v-if="$slots.toolbar" class="min-w-0 flex-1">
          <slot name="toolbar" :table="table" />
        </div>
      </div>
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
          class="w-full min-w-full border-collapse text-sm"
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
                class="relative px-3 py-2 align-middle"
                :class="[header.column.getCanSort() && sorting ? 'cursor-pointer select-none' : '']"
                :style="{
                  width: header.getSize() !== 150 ? `${String(header.getSize())}px` : undefined,
                }"
                @click="header.column.getCanSort() && sorting ? header.column.getToggleSortingHandler()?.($event) : undefined"
              >
                <div class="inline-flex max-w-full items-center gap-1">
                  <span v-if="!header.isPlaceholder" class="min-w-0 truncate">
                    <FlexRender
                      v-if="header.column.columnDef.header"
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                    />
                  </span>
                  <span
                    v-if="header.column.getIsSorted() === 'asc'"
                    class="shrink-0 text-[var(--foreground)]"
                    aria-hidden="true"
                  >↑</span>
                  <span
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    class="shrink-0 text-[var(--foreground)]"
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
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--muted)]/20 data-[state=selected]:bg-[var(--muted)]/30"
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
          <slot name="empty" :table="table">
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
        · {{ rowCount }} row{{ rowCount === 1 ? '' : 's' }}
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
