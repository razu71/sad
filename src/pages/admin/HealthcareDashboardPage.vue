<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { Activity, Droplets, Heart, Lightbulb, Moon, Sun, Timer, Wind } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import PageHeader from '@/components/app/PageHeader.vue'
import Card from '@/components/ui/Card.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Calendar from '@/components/ui/Calendar.vue'
import Progress from '@/components/ui/Progress.vue'
import * as HCharts from '@/lib/apex/healthcareCharts'
import { formatDate } from '@/lib/utils'

type MedRow = { id: string; name: string; dose: string; window: string; morning: boolean }
const apptDate = ref<Date | null>(new Date())

const medColumns: ColumnDef<MedRow>[] = [
  { accessorKey: 'name', header: 'Medication', enableSorting: true },
  { accessorKey: 'dose', header: 'Dose' },
  {
    id: 'time',
    header: 'Time',
    cell: (info) => {
      const r = info.row.original
      const Icon = r.morning ? Sun : Moon
      return h('span', { class: 'inline-flex items-center gap-1.5 text-sm' }, [h(Icon, { class: 'h-3.5 w-3.5' }), h('span', r.window)])
    },
  },
]

const heartO = HCharts.HEALTH_HEART_BARS.getOptions()
const heartS = HCharts.HEALTH_HEART_BARS.getSeries()
const hydO = HCharts.HEALTH_HYDRATION_RADIAL.getOptions()
const hydS = HCharts.HEALTH_HYDRATION_RADIAL.getSeries()
const bloodO = HCharts.HEALTH_BLOOD_LOLLIPOP.getOptions()
const bloodS = HCharts.HEALTH_BLOOD_LOLLIPOP.getSeries()
const actO = HCharts.HEALTH_ACTIVITY_LINE.getOptions()
const actS = HCharts.HEALTH_ACTIVITY_LINE.getSeries()
const slpO = HCharts.HEALTH_SLEEP_LINE.getOptions()
const slpS = HCharts.HEALTH_SLEEP_LINE.getSeries()

type Appt = { id: string; type: string; doctor: string; room: string; at: string; left: 'primary' | 'secondary' | 'info' }
const appointments: Appt[] = [
  { id: '1', type: 'General consultation', doctor: 'Dr. Hayes', room: 'A2', at: '2025-04-28T10:00:00.000Z', left: 'info' },
  { id: '2', type: 'Follow-up', doctor: 'Dr. Silva', room: 'B1', at: '2025-04-28T11:30:00.000Z', left: 'secondary' },
  { id: '3', type: 'Lab results', doctor: 'Dr. Oka', room: 'C4', at: '2025-04-28T15:00:00.000Z', left: 'primary' },
]

const borderL = (k: Appt['left']) => ({
  primary: 'border-l-[var(--primary)]',
  secondary: 'border-l-[var(--secondary)]',
  info: 'border-l-[var(--info)]',
}[k])

const medications: MedRow[] = [
  { id: '1', name: 'Vitamin D', dose: '1000 IU', window: '08:00', morning: true },
  { id: '2', name: 'Loratadine', dose: '10 mg', window: '09:00', morning: true },
  { id: '3', name: 'Metformin', dose: '500 mg', window: '20:00', morning: false },
]
const medData = computed(() => medications)

</script>

<template>
  <div>
    <PageHeader
      title="Healthcare dashboard"
      description="Vitals, appointments, and medication (mock, inspired by PulseView)."
    />

    <div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <div class="mb-1 flex items-center justify-between">
          <div class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--destructive)]/10 text-[var(--destructive)]">
            <Heart class="h-4 w-4" />
          </div>
          <span class="text-2xl font-bold text-[var(--foreground)]">89</span>
        </div>
        <p class="text-sm text-[var(--muted-foreground)]">Heart rate (bpm)</p>
        <p class="mt-0.5 text-xs text-[var(--success)]">Within healthy range (mock)</p>
        <div class="mt-3 min-h-[120px] w-full min-w-0">
          <apexchart type="bar" height="140" :options="heartO" :series="heartS" />
        </div>
      </Card>
      <Card>
        <div class="mb-1 flex items-center justify-between">
          <div class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--success)]/15 text-[var(--success)]">
            <Droplets class="h-4 w-4" />
          </div>
        </div>
        <p class="text-sm text-[var(--muted-foreground)]">Hydration</p>
        <p class="text-xs text-[var(--muted-foreground)]">Goal 2.5L daily</p>
        <div class="flex min-h-[180px] items-center justify-center">
          <apexchart type="radialBar" height="200" :options="hydO" :series="hydS" />
        </div>
      </Card>
      <Card class="sm:col-span-2 lg:col-span-1">
        <div class="mb-1 flex items-center justify-between">
          <div class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--info)]/15 text-[var(--info)]">
            <Wind class="h-4 w-4" />
          </div>
          <span class="text-2xl font-bold text-[var(--foreground)]">1100</span>
        </div>
        <p class="text-sm text-[var(--muted-foreground)]">Blood cells (µL sample)</p>
        <p class="mt-0.5 text-xs text-[var(--muted-foreground)]">Track trend with your clinician (mock)</p>
        <div class="mt-2 min-h-[120px] w-full min-w-0">
          <apexchart type="line" height="140" :options="bloodO" :series="bloodS" />
        </div>
      </Card>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <Card class="lg:col-span-2">
        <h2 class="text-base font-semibold text-[var(--foreground)]">Doctor’s appointment</h2>
        <p class="mt-0.5 text-sm text-[var(--muted-foreground)]">This week (mock). Tap a day to set focus.</p>
        <div class="mt-4 max-w-sm">
          <Calendar v-model="apptDate" />
        </div>
        <h3 class="mt-6 text-sm font-medium text-[var(--foreground)]">Booked</h3>
        <p class="text-xs text-[var(--muted-foreground)]">{{ formatDate(new Date(), 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }} — same week as calendar</p>
        <ul class="mt-3 space-y-2">
          <li
            v-for="a in appointments"
            :key="a.id"
            :class="['rounded-[var(--radius-md)] border border-[var(--border)] border-l-4 bg-[var(--card)] p-3', borderL(a.left)]"
          >
            <div class="text-sm font-medium text-[var(--foreground)]">{{ a.type }}</div>
            <div class="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-[var(--muted-foreground)]">
              <span>{{ a.doctor }}</span>
              <span>RM {{ a.room }}</span>
              <span class="inline-flex items-center gap-1">
                <Timer class="h-3 w-3" />
                {{ formatDate(a.at, 'en-US', { hour: 'numeric', minute: '2-digit' }) }}
              </span>
            </div>
          </li>
        </ul>
      </Card>
      <div class="space-y-4">
        <Card>
          <h2 class="text-base font-semibold text-[var(--foreground)]">Sleep</h2>
          <p class="mt-1 text-3xl font-bold text-[var(--foreground)]">7h 45m</p>
          <p class="text-sm text-[var(--muted-foreground)]">Duration · <span class="text-[var(--success)]">Score 92%</span></p>
          <p class="mt-3 text-xs font-medium text-[var(--foreground)]">SLP</p>
            <div class="mt-1 w-full min-w-0">
            <apexchart type="line" height="48" :options="slpO" :series="slpS" />
            <div class="mt-2">
            <Progress :value="92" size="sm" />
            </div>
            </div>
          <p class="mt-3 flex items-start gap-2 text-xs text-[var(--muted-foreground)]">
            <Lightbulb class="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
            Keep a consistent sleep window for better recovery (mock tip).
          </p>
        </Card>
        <Card>
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-base font-semibold text-[var(--foreground)]">Activity</h2>
              <p class="text-2xl font-bold text-[var(--foreground)]">2,710 <span class="text-base font-normal text-[var(--muted-foreground)]">Cal</span></p>
            </div>
            <span class="rounded-full bg-[var(--primary)]/15 px-2 py-0.5 text-xs font-medium text-[var(--primary)]">92% goal</span>
          </div>
          <div class="mt-3 min-h-[120px] w-full min-w-0">
            <apexchart type="area" height="120" :options="actO" :series="actS" />
          </div>
          <ul class="mt-3 space-y-1 text-xs text-[var(--muted-foreground)]">
            <li class="flex justify-between"><span>Walking</span><span>130 Cal</span></li>
            <li class="flex justify-between"><span>Running</span><span>380 Cal</span></li>
            <li class="flex justify-between"><span>Workout</span><span>247 Cal</span></li>
          </ul>
        </Card>
      </div>
    </div>

    <Card class="mt-6">
      <div class="mb-3 flex items-center gap-2">
        <Activity class="h-4 w-4 text-[var(--info)]" />
        <h2 class="text-base font-semibold text-[var(--foreground)]">Medication</h2>
      </div>
      <p class="mb-3 text-sm text-[var(--muted-foreground)]">Dosing schedule (mock) — not medical advice.</p>
      <DataTable
        :columns="medColumns"
        :data="medData"
        :pagination="true"
        :page-size="5"
        :sorting="true"
        :global-filter="false"
        :column-filters="false"
        :empty="{ title: 'No medications', description: 'Add your plan with your care team.' }"
      />
    </Card>
  </div>
</template>
