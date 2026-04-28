<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { Fuel, Gauge, Route, Wrench } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import PageHeader from '@/components/app/PageHeader.vue'
import StatCard from '@/components/app/StatCard.vue'
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/Card.vue'
import DataTable from '@/components/ui/DataTable.vue'
import { FLEET_FUEL_BARS, FLEET_MILEAGE_AREA, FLEET_STATUS_DONUT } from '@/lib/apex/fleetCharts'
import { formatDate } from '@/lib/utils'

const fuelO = FLEET_FUEL_BARS.getOptions()
const fuelS = FLEET_FUEL_BARS.getSeries()
const mileO = FLEET_MILEAGE_AREA.getOptions()
const mileS = FLEET_MILEAGE_AREA.getSeries()
const donO = FLEET_STATUS_DONUT.getOptions()
const donS = FLEET_STATUS_DONUT.getSeries()
const yearFilter = ref('2025')

type VehicleRow = {
  id: string
  unit: string
  driver: string
  status: 'On route' | 'Idle' | 'Maintenance'
  odometer: number
  lastService: string
}

const vehicles: VehicleRow[] = [
  { id: '1', unit: 'V-104', driver: 'A. Nørgaard', status: 'On route', odometer: 124_320, lastService: '2025-04-10T00:00:00.000Z' },
  { id: '2', unit: 'V-088', driver: 'M. Ortiz', status: 'Idle', odometer: 98_400, lastService: '2025-04-18T00:00:00.000Z' },
  { id: '3', unit: 'V-201', driver: '—', status: 'Maintenance', odometer: 201_000, lastService: '2025-04-20T00:00:00.000Z' },
  { id: '4', unit: 'V-055', driver: 'J. Kwon', status: 'On route', odometer: 76_200, lastService: '2025-04-12T00:00:00.000Z' },
]

const vehicleColumns = computed<ColumnDef<VehicleRow>[]>(() => [
  { accessorKey: 'unit', header: 'Unit', enableSorting: true },
  { accessorKey: 'driver', header: 'Driver' },
  {
    id: 'status',
    header: 'Status',
    cell: (info) => {
      const s = info.row.original.status
      const v = s === 'On route' ? 'success' : s === 'Idle' ? 'outline' : 'warning'
      return h(Badge, { variant: v, class: 'font-normal' }, () => s)
    },
  },
  {
    accessorKey: 'odometer',
    header: 'Odometer (km)',
    cell: (info) => h('span', { class: 'tabular-nums' }, (info.getValue() as number).toLocaleString()),
  },
  {
    accessorKey: 'lastService',
    header: 'Last service',
    cell: (info) => h('span', { class: 'text-sm' }, formatDate(String(info.getValue() ?? ''), 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })),
  },
])
</script>

<template>
  <div>
    <PageHeader
      title="Fleet tracking"
      description="Utilization, fuel, and odometer trends (mock data)."
    />

    <div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Vehicles on route"
        :value="42"
        :delta="{ value: 'Stable vs last week', trend: 'flat' }"
        :icon="Route"
      />
      <StatCard
        label="In maintenance"
        :value="6"
        :delta="{ value: 'vs 7 last week', trend: 'flat' }"
        :icon="Wrench"
      />
      <StatCard
        label="Avg. fuel (L/100km)"
        :value="7.8"
        :delta="{ value: '−0.2 vs last week', trend: 'up' }"
        :icon="Fuel"
      />
      <StatCard
        label="Fleet miles (30d)"
        :value="'284k'"
        :delta="{ value: '+3.1% vs last month', trend: 'up' }"
        :icon="Gauge"
      />
    </div>

    <div class="mb-6 grid gap-4 lg:grid-cols-3">
      <Card class="lg:col-span-1">
        <h2 class="text-base font-semibold text-[var(--foreground)]">Fleet by status</h2>
        <p class="mb-2 mt-0.5 text-sm text-[var(--muted-foreground)]">Share of vehicles (mock).</p>
        <div class="flex min-h-[240px] items-center justify-center">
          <apexchart type="donut" height="260" :options="donO" :series="donS" />
        </div>
      </Card>
      <Card class="lg:col-span-2">
        <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold text-[var(--foreground)]">Cumulative mileage</h2>
            <p class="text-sm text-[var(--muted-foreground)]">YTD odometer roll-up (mock).</p>
          </div>
        </div>
        <div class="min-h-[220px] w-full min-w-0">
          <apexchart type="area" height="240" :options="mileO" :series="mileS" />
        </div>
      </Card>
    </div>

    <Card>
      <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 class="text-base font-semibold text-[var(--foreground)]">Weekly fuel trend</h2>
          <p class="text-sm text-[var(--muted-foreground)]">Per-vehicle class average (mock).</p>
        </div>
        <label class="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <span>Year</span>
          <select
            v-model="yearFilter"
            class="h-9 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] px-2 text-sm"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </label>
      </div>
      <div class="min-h-[200px] w-full min-w-0">
        <apexchart type="bar" height="220" :options="fuelO" :series="fuelS" />
      </div>
    </Card>

    <Card class="mt-6">
      <h2 class="text-base font-semibold text-[var(--foreground)]">Vehicles</h2>
      <p class="mb-3 mt-0.5 text-sm text-[var(--muted-foreground)]">Status and odometer (mock).</p>
      <DataTable
        :columns="vehicleColumns"
        :data="vehicles"
        :pagination="true"
        :page-size="5"
        :sorting="true"
        :global-filter="false"
        :column-filters="false"
        :empty="{ title: 'No vehicles', description: 'Add units to the fleet to track them here.' }"
      />
    </Card>
  </div>
</template>
