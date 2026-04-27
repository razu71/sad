<script setup lang="ts">
import { DollarSign, Percent, ShoppingCart, Users } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Chart from '@/components/ui/Chart.vue'
import PageHeader from '@/components/app/PageHeader.vue'
import StatCard from '@/components/app/StatCard.vue'
import Table from '@/components/ui/Table.vue'
import { formatDate } from '@/lib/utils'

const activities = [
  { at: '2025-04-26T14:20:00.000Z', user: 'Avery Brooks', action: 'Updated team settings' },
  { at: '2025-04-26T12:05:00.000Z', user: 'Jordan Lee', action: 'Exported user list' },
  { at: '2025-04-26T09:40:00.000Z', user: 'Sam Rivera', action: 'Signed in' },
  { at: '2025-04-25T16:10:00.000Z', user: 'Riley Chen', action: 'Created report' },
]

const topUsers = [
  { name: 'Avery Brooks', events: 42 },
  { name: 'Jordan Lee', events: 31 },
  { name: 'Riley Chen', events: 28 },
  { name: 'Sam Rivera', events: 19 },
]
</script>

<template>
  <div>
    <PageHeader title="Dashboard" description="Overview of usage and health." />

    <div class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Users"
        :value="1284"
        :delta="{ value: '12% vs last week', trend: 'up' }"
        :icon="Users"
      />
      <StatCard
        label="Revenue"
        :value="'$24.5k'"
        :delta="{ value: '3% vs last week', trend: 'up' }"
        :icon="DollarSign"
      />
      <StatCard
        label="Orders"
        :value="428"
        :delta="{ value: '2% vs last week', trend: 'flat' }"
        :icon="ShoppingCart"
      />
      <StatCard
        label="Conversion"
        :value="'3.2%'"
        :delta="{ value: '0.4% vs last week', trend: 'down' }"
        :icon="Percent"
      />
    </div>

    <Card>
      <h2 class="text-base font-semibold text-[var(--foreground)]">Recent activity</h2>
      <p class="mt-1 text-sm text-[var(--muted-foreground)]">Latest actions in your workspace (mock data).</p>
      <div class="mt-4">
        <Table>
          <table>
            <thead>
              <tr class="border-b border-[var(--border)] text-left text-xs font-medium text-[var(--muted-foreground)]">
                <th class="p-2">Time</th>
                <th class="p-2">User</th>
                <th class="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in activities" :key="i" class="border-b border-[var(--border)] last:border-0">
                <td class="p-2 text-sm text-[var(--muted-foreground)]">{{ formatDate(row.at) }}</td>
                <td class="p-2 text-sm text-[var(--foreground)]">{{ row.user }}</td>
                <td class="p-2 text-sm text-[var(--muted-foreground)]">{{ row.action }}</td>
              </tr>
            </tbody>
          </table>
        </Table>
      </div>
    </Card>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <div>
        <h2 class="mb-2 text-sm font-medium text-[var(--foreground)]">Revenue (placeholder)</h2>
        <Chart type="line" :data="[]" />
      </div>
      <Card>
        <h2 class="text-base font-semibold text-[var(--foreground)]">Top users</h2>
        <p class="mt-1 text-sm text-[var(--muted-foreground)]">By event volume (mock).</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li
            v-for="u in topUsers"
            :key="u.name"
            class="flex items-center justify-between border-b border-[var(--border)] py-2 last:border-0"
          >
            <span class="text-[var(--foreground)]">{{ u.name }}</span>
            <span class="text-[var(--muted-foreground)]">{{ u.events }} events</span>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>
