<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpRight, Sparkles } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import PageHeader from '@/components/app/PageHeader.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import DataTable from '@/components/ui/DataTable.vue'
import NativeSelect from '@/components/ui/NativeSelect.vue'
import Progress from '@/components/ui/Progress.vue'
import Badge from '@/components/ui/Badge.vue'
import Avatar from '@/components/ui/Avatar.vue'
import {
  FINTECH_DAILY_SALES,
  FINTECH_GROWTH_RADIAL,
  getFintechSparklineOptions,
  getFintechSparklineSeries,
} from '@/lib/apex/fintechCharts'
import { userAvatarImageUrl } from '@/lib/userAvatar'
import { formatDate } from '@/lib/utils'

const salesRange = ref('week')

const dailyOpts = FINTECH_DAILY_SALES.getOptions()
const dailySeries = FINTECH_DAILY_SALES.getSeries()
const recvOpt = getFintechSparklineOptions(true)
const recvSeries = getFintechSparklineSeries(true)
const ordOpt = getFintechSparklineOptions(false)
const ordSeries = getFintechSparklineSeries(false)
const growthOpts = FINTECH_GROWTH_RADIAL.getOptions()
const growthSeries = FINTECH_GROWTH_RADIAL.getSeries()

type SaleRow = {
  id: string
  name: string
  when: string
  status: 'New' | 'Cancelled' | 'Completed'
  amount: string
}

const salesRows: SaleRow[] = [
  { id: '1', name: 'Timothy Williams', when: '2025-04-28T10:00:00.000Z', status: 'New', amount: '+$324.99' },
  { id: '2', name: 'Sarah Ng', when: '2025-04-28T14:00:00.000Z', status: 'Completed', amount: '+$88.00' },
  { id: '3', name: 'Diego M.', when: '2025-04-27T09:00:00.000Z', status: 'Cancelled', amount: '−$42.00' },
  { id: '4', name: 'Yuki A.', when: '2025-04-26T16:00:00.000Z', status: 'Completed', amount: '+$1,200.00' },
]

const saleColumns = computed<ColumnDef<SaleRow>[]>(() => [
  {
    id: 'user',
    header: 'User',
    cell: (info) => {
      const r = info.row.original
      return h('div', { class: 'flex items-center gap-2' }, [
        h(Avatar, { alt: r.name, size: 'sm', src: userAvatarImageUrl(r.id, 'sm') }),
        h('div', {}, [
          h('div', { class: 'text-sm font-medium text-[var(--foreground)]' }, r.name),
          h('div', { class: 'text-xs text-[var(--muted-foreground)]' }, formatDate(r.when, 'en-US', { month: 'short', day: 'numeric' })),
        ]),
      ])
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: (info) => {
      const s = info.row.original.status
      const v = s === 'New' ? 'success' : s === 'Cancelled' ? 'warning' : 'primary'
      return h(Badge, { variant: v, class: 'font-normal' }, () => s)
    },
  },
  { accessorKey: 'amount', header: 'Amount' },
  {
    id: 'go',
    header: '',
    size: 40,
    cell: () => h(Button, { as: 'a', size: 'sm', variant: 'ghost', href: '#', 'aria-label': 'Open' }, { default: () => h(ArrowUpRight, { class: 'h-4 w-4' }) }),
  },
])

const topItems = [
  { name: 'DualSense', cat: 'Accessories', pct: 68, price: '$69', trend: 12 },
  { name: 'VR2', cat: 'VR', pct: 42, price: '$549', trend: -3 },
  { name: 'Gamepad', cat: 'Accessories', pct: 55, price: '$59', trend: 5 },
  { name: 'Steam codes', cat: 'Digital', pct: 30, price: 'Varies', trend: 8 },
]
</script>

<template>
  <div>
    <PageHeader
      title="Fintech dashboard"
      description="Sales analysis, revenue, and product mix (mock data)."
    />

    <div class="mb-6 grid gap-4 lg:grid-cols-3">
      <Card
        class="border-0 bg-gradient-to-br from-[var(--accent)] to-[var(--card)] p-5 shadow-[var(--shadow-md)]"
        :bordered="false"
      >
        <div class="flex h-full min-h-[160px] flex-col justify-between">
          <div>
            <div class="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
              <Sparkles class="h-4 w-4" />
            </div>
            <h2 class="mt-2 text-base font-semibold text-[var(--foreground)]">AI assistant</h2>
            <p class="mt-1 text-sm text-[var(--muted-foreground)]">Get instant explanations for dips and peaks in your sales.</p>
          </div>
          <Button class="mt-3 w-full sm:w-auto" type="button">
            Analyze product sales
            <ArrowUpRight class="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card>
        <div class="mb-2 flex items-start justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold text-[var(--foreground)]">Total sales</h2>
            <p class="text-xs text-[var(--muted-foreground)]">Daily (mock). Wednesday highlighted.</p>
          </div>
          <NativeSelect v-model="salesRange" class="h-8 w-28" aria-label="Range">
            <option value="week">Week</option>
            <option value="month">Month</option>
          </NativeSelect>
        </div>
        <div class="min-h-[200px] w-full min-w-0">
          <apexchart type="bar" height="220" :options="dailyOpts" :series="dailySeries" />
        </div>
      </Card>

      <Card>
        <h2 class="text-base font-semibold text-[var(--foreground)]">Sales revenue</h2>
        <p class="mt-0.5 text-sm text-[var(--muted-foreground)]">Received vs ordered (mock).</p>
        <div class="mt-4 space-y-4">
          <div>
            <div class="flex items-baseline justify-between">
              <span class="text-sm text-[var(--muted-foreground)]">Received amount</span>
              <span class="text-lg font-semibold text-[var(--foreground)]">$1,609.18</span>
            </div>
            <p class="text-xs text-[var(--success)]">+24% vs last period</p>
            <div class="mt-1 h-14 w-full min-w-0">
              <apexchart type="area" height="56" :options="recvOpt" :series="recvSeries" />
            </div>
          </div>
          <div>
            <div class="flex items-baseline justify-between">
              <span class="text-sm text-[var(--muted-foreground)]">Ordered amount</span>
              <span class="text-lg font-semibold text-[var(--foreground)]">$2,189.21</span>
            </div>
            <p class="text-xs text-[var(--destructive)]">−8% vs last period</p>
            <div class="mt-1 h-14 w-full min-w-0">
              <apexchart type="area" height="56" :options="ordOpt" :series="ordSeries" />
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <Card class="lg:col-span-1">
        <h2 class="text-base font-semibold text-[var(--foreground)]">Recent sales</h2>
        <p class="mb-3 mt-0.5 text-sm text-[var(--muted-foreground)]">Latest transactions (mock).</p>
        <DataTable
          :columns="saleColumns"
          :data="salesRows"
          :pagination="true"
          :page-size="5"
          :sorting="true"
          :global-filter="false"
          :column-filters="false"
          :empty="{ title: 'No sales', description: 'Nothing to show yet.' }"
        />
      </Card>

      <Card>
        <h2 class="text-base font-semibold text-[var(--foreground)]">Growth</h2>
        <p class="mt-0.5 text-sm text-[var(--muted-foreground)]">Period-over-period (mock).</p>
        <div class="flex min-h-[240px] items-center justify-center">
          <apexchart type="radialBar" height="260" :options="growthOpts" :series="growthSeries" />
        </div>
      </Card>

      <Card>
        <h2 class="text-base font-semibold text-[var(--foreground)]">Top item sales</h2>
        <p class="mb-3 mt-0.5 text-sm text-[var(--muted-foreground)]">By category (mock).</p>
        <ul class="space-y-4">
          <li v-for="it in topItems" :key="it.name" class="space-y-1">
            <div class="flex items-center justify-between gap-2 text-sm">
              <span class="font-medium text-[var(--foreground)]">{{ it.name }}</span>
              <span class="shrink-0 text-[var(--muted-foreground)]">{{ it.cat }}</span>
            </div>
            <div class="flex items-center justify-between gap-2 text-xs">
              <div class="min-w-0 flex-1">
                <Progress :value="it.pct" size="md" />
              </div>
              <span class="shrink-0 text-[var(--foreground)]">{{ it.price }}</span>
              <span :class="it.trend >= 0 ? 'text-[var(--success)]' : 'text-[var(--destructive)]'">{{ it.trend >= 0 ? '+' : '' }}{{ it.trend }}%</span>
            </div>
          </li>
        </ul>
        <p class="mt-4 text-center text-xs text-[var(--muted-foreground)]">Bars use your primary color from theme</p>
      </Card>
    </div>
  </div>
</template>
