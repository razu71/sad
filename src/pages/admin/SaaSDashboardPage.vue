<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { Check, CircleDollarSign, Clock, Inbox, UserPlus, Users, Wallet } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import PageHeader from '@/components/app/PageHeader.vue'
import StatCard from '@/components/app/StatCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import DataTable from '@/components/ui/DataTable.vue'
import NativeSelect from '@/components/ui/NativeSelect.vue'
import { getPayrollBarChartOptions, getPayrollBarSeries, SAAS_CHART_COLORS } from '@/lib/apex/saasPayrollChart'
import { formatDate } from '@/lib/utils'
import { userAvatarImageUrl } from '@/lib/userAvatar'

const payrollOptions = getPayrollBarChartOptions()
const payrollSeries = getPayrollBarSeries()
const payrollRange = ref('yearly')

type PositionRow = {
  id: string
  title: string
  department: string
  status: 'filled' | 'pending'
}

const positions: PositionRow[] = [
  { id: '1', title: 'Product Designer', department: 'Design', status: 'filled' },
  { id: '2', title: 'HR Manager', department: 'People', status: 'pending' },
  { id: '3', title: 'FE Developer', department: 'Engineering', status: 'pending' },
  { id: '4', title: 'Data Analyst', department: 'Analytics', status: 'filled' },
]

const positionColumns: ColumnDef<PositionRow>[] = [
  { accessorKey: 'title', header: 'Title', enableSorting: true },
  { accessorKey: 'department', header: 'Department', enableSorting: true },
  {
    id: 'status',
    header: 'Status',
    cell: (info) => {
      const row = info.row.original
      const icon = row.status === 'filled' ? Check : Clock
      const label = row.status === 'filled' ? 'Filled' : 'Open'
      const cls = row.status === 'filled' ? 'text-[var(--success)]' : 'text-[var(--info)]'
      return h('span', { class: `inline-flex items-center gap-1.5 text-sm ${cls}` }, [
        h(icon, { class: 'h-4 w-4' }),
        label,
      ])
    },
  },
]

type ApplicantRow = {
  id: string
  name: string
  position: string
  experience: string
  salary: string
  applied: string
  status: 'Hired' | 'Interview' | 'Success'
}

const applicants: ApplicantRow[] = [
  { id: '1', name: 'Mia Chen', position: 'UI/UX Designer', experience: '3 year', salary: '$5k – $10k', applied: '2024-01-01T00:00:00.000Z', status: 'Hired' },
  { id: '2', name: 'Leo Park', position: 'Digital Marketing', experience: '1.5 year', salary: '$4k – $8k', applied: '2024-01-15T00:00:00.000Z', status: 'Interview' },
  { id: '3', name: 'Nora Ali', position: 'Backend Engineer', experience: '4 year', salary: '$8k – $12k', applied: '2024-02-02T00:00:00.000Z', status: 'Success' },
  { id: '4', name: 'Samir Khan', position: 'Product Manager', experience: '2 year', salary: '$7k – $11k', applied: '2024-02-20T00:00:00.000Z', status: 'Interview' },
]

const applicantColumns = computed<ColumnDef<ApplicantRow>[]>(() => [
  {
    id: 'fullName',
    accessorKey: 'name',
    header: 'Full name',
    enableSorting: true,
    cell: (info) => {
      const a = info.row.original
      return h('div', { class: 'flex items-center gap-2' }, [
        h(Avatar, { alt: a.name, size: 'sm', src: userAvatarImageUrl(a.id, 'sm') }),
        h('span', { class: 'text-sm font-medium text-[var(--foreground)]' }, a.name),
      ])
    },
  },
  { accessorKey: 'position', header: 'Position', enableSorting: true },
  { accessorKey: 'experience', header: 'Experience' },
  { accessorKey: 'salary', header: 'Salary range' },
  {
    accessorKey: 'applied',
    header: 'Applied date',
    cell: (info) => h('span', { class: 'text-sm' }, formatDate(String(info.getValue() ?? ''), 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })),
  },
  {
    id: 'applicantStatus',
    header: 'Status',
    cell: (info) => {
      const s = info.row.original.status
      const variant = s === 'Interview' ? 'warning' : 'success'
      return h(Badge, { variant, class: 'font-normal' }, () => s)
    },
  },
])
</script>

<template>
  <div>
    <PageHeader
      title="SaaS dashboard"
      description="Headcount, payroll, hiring pipeline — sample data for the Employs-style layout."
    />

    <div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total employees"
        :value="325"
        :delta="{ value: '+3.5% last month', trend: 'up' }"
        :icon="Users"
      />
      <StatCard
        label="Average salary"
        :value="'$25,789'"
        :delta="{ value: '0.0% last month', trend: 'flat' }"
        :icon="CircleDollarSign"
      />
      <StatCard
        label="Total outstanding"
        :value="'$70,564'"
        :delta="{ value: '−7.5% last month', trend: 'down' }"
        :icon="Wallet"
      />
      <StatCard
        label="Total requests"
        :value="24"
        :delta="{ value: '+3.5% last month', trend: 'up' }"
        :icon="Inbox"
      />
    </div>

    <div class="grid gap-6 lg:grid-cols-5">
      <Card class="lg:col-span-3" :padded="true">
        <div class="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 class="text-base font-semibold text-[var(--foreground)]">Payroll history</h2>
            <p class="mt-0.5 text-sm text-[var(--muted-foreground)]">Total vs delayed by month (mock).</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <NativeSelect v-model="payrollRange" class="h-9 w-36" aria-label="Period">
              <option value="yearly">Yearly</option>
              <option value="quarterly">Quarterly</option>
            </NativeSelect>
          </div>
        </div>
        <div class="min-h-[280px] w-full min-w-0">
          <apexchart type="bar" height="300" :options="payrollOptions" :series="payrollSeries" />
        </div>
        <div class="mt-2 flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border)] pt-3">
          <p class="me-auto text-xs text-[var(--muted-foreground)]">
            <span
              class="me-1 inline-block h-2 w-2 rounded-full"
              :style="{ backgroundColor: SAAS_CHART_COLORS.seriesA }"
              aria-hidden="true"
            />
            Total payout
            <span class="ms-2 font-medium text-[var(--foreground)]">$89,456</span>
            <span
              class="ms-4 me-1 inline-block h-2 w-2 rounded-full"
              :style="{ backgroundColor: SAAS_CHART_COLORS.seriesB }"
              aria-hidden="true"
            />
            Delayed payout
            <span class="ms-2 font-medium text-[var(--foreground)]">$12,180</span>
          </p>
          <Button variant="outline" size="sm" type="button">Full report</Button>
        </div>
      </Card>

      <Card class="lg:col-span-2" :padded="true">
        <h2 class="text-base font-semibold text-[var(--foreground)]">Open positions</h2>
        <p class="mt-0.5 text-sm text-[var(--muted-foreground)]">Recruiting pipeline (mock).</p>
        <div class="mt-4">
          <DataTable
            :columns="positionColumns"
            :data="positions"
            :pagination="true"
            :page-size="5"
            :sorting="true"
            :global-filter="false"
            :column-filters="false"
            :empty="{ title: 'No open roles', description: 'Add a job in settings.' }"
          />
        </div>
        <p class="mt-3 text-right text-sm text-[var(--info)]">View all →</p>
      </Card>
    </div>

    <Card class="mt-6" :padded="true">
      <div class="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 class="text-base font-semibold text-[var(--foreground)]">Applicant details</h2>
          <p class="mt-0.5 text-sm text-[var(--muted-foreground)]">Recent candidates (mock).</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" type="button">Export</Button>
          <Button size="sm" type="button">
            <UserPlus class="h-4 w-4" />
            Add member
          </Button>
        </div>
      </div>
      <DataTable
        :columns="applicantColumns"
        :data="applicants"
        :pagination="true"
        :sorting="true"
        :global-filter="false"
        :column-filters="false"
        :empty="{ title: 'No applicants', description: 'Import or add applications.' }"
      />
    </Card>
  </div>
</template>
