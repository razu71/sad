<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { Users } from 'lucide-vue-next'
import { ref } from 'vue'
import Breadcrumbs from '@/components/app/Breadcrumbs.vue'
import PageHeader from '@/components/app/PageHeader.vue'
import StatCard from '@/components/app/StatCard.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'
import Accordion from '@/components/ui/Accordion.vue'
import Alert from '@/components/ui/Alert.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Chart from '@/components/ui/Chart.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Collapsible from '@/components/ui/Collapsible.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Drawer from '@/components/ui/Drawer.vue'
import Empty from '@/components/ui/Empty.vue'
import Input from '@/components/ui/Input.vue'
import InputGroup from '@/components/ui/InputGroup.vue'
import Kbd from '@/components/ui/Kbd.vue'
import Label from '@/components/ui/Label.vue'
import NativeSelect from '@/components/ui/NativeSelect.vue'
import Pagination from '@/components/ui/Pagination.vue'
import Popover from '@/components/ui/Popover.vue'
import Progress from '@/components/ui/Progress.vue'
import RadioGroup from '@/components/ui/RadioGroup.vue'
import Separator from '@/components/ui/Separator.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import Slider from '@/components/ui/Slider.vue'
import Spinner from '@/components/ui/Spinner.vue'
import Switch from '@/components/ui/Switch.vue'
import Table from '@/components/ui/Table.vue'
import Tabs from '@/components/ui/Tabs.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Toggle from '@/components/ui/Toggle.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import Typography from '@/components/ui/Typography.vue'

const playgroundTab = ref('forms')
const dialogOpen = ref(false)
const drawerOpen = ref(false)
const popOpen = ref(false)
const collOpen = ref(false)
const sw = ref(true)
const sliderVal = ref(40)
const page = ref(1)
const selectVal = ref('a')
const radioVal = ref('one')
const cb = ref(false)
const pgIn = ref('')
const pgTa = ref('')
const toggleB = ref(false)
const dtRows: { id: string; a: string }[] = []
const dtCols: ColumnDef<{ id: string; a: string }>[] = [{ id: 'a', accessorKey: 'a', header: 'A' }]

const accordionItems = [
  { id: '1', title: 'First item', content: 'Hidden content for regression checks.' },
  { id: '2', title: 'Second item', content: 'Another panel.' },
]
</script>

<template>
  <div class="pb-16">
    <div class="sticky top-0 z-20 -mx-4 mb-6 border-b border-[var(--border)] bg-[var(--card)]/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-[var(--card)]/80">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Typography as="h1" variant="h1">UI playground</Typography>
          <Typography as="p" variant="muted" class="mt-1">Living style guide — flip theme without leaving the page.</Typography>
        </div>
        <ThemeToggle variant="segmented" />
      </div>
    </div>

    <Tabs v-model="playgroundTab" class="mb-8">
      <template #tabs="{ modelValue, setValue }">
        <div class="flex flex-wrap gap-2" role="tablist">
          <Button
            v-for="t in (['forms', 'feedback', 'overlays', 'data', 'navigation', 'misc'] as const)"
            :key="t"
            size="sm"
            :variant="modelValue === t ? 'primary' : 'outline'"
            type="button"
            @click="setValue(t)"
          >
            {{ t }}
          </Button>
        </div>
      </template>

      <div v-show="playgroundTab === 'forms'" class="mt-6 space-y-8">
        <section>
          <Typography as="h2" variant="h2" class="mb-3">Inputs</Typography>
          <div class="grid max-w-xl gap-4">
            <div>
              <Label for="pg-in">Text input</Label>
              <Input id="pg-in" v-model="pgIn" class="mt-1" placeholder="Placeholder" />
            </div>
            <div>
              <Label for="pg-ta">Textarea</Label>
              <Textarea id="pg-ta" v-model="pgTa" class="mt-1" />
            </div>
            <InputGroup>
              <template #prefix>https://</template>
              <Input v-model="pgIn" />
            </InputGroup>
            <div class="flex flex-wrap items-center gap-3">
              <Checkbox v-model="cb" label="Checkbox" />
              <Switch v-model="sw" />
              <NativeSelect v-model="selectVal" class="w-40">
                <option value="a">Option A</option>
                <option value="b">Option B</option>
              </NativeSelect>
            </div>
            <RadioGroup v-model="radioVal" name="pg-radio" :options="[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]" />
            <div>
              <p class="text-sm font-medium text-[var(--foreground)]">Slider</p>
              <Slider v-model="sliderVal" class="mt-2 max-w-xs" :min="0" :max="100" :step="1" />
            </div>
          </div>
        </section>
        <section>
          <Typography as="h2" variant="h2" class="mb-3">Composed (app)</Typography>
        <PageHeader title="Sample page" description="PageHeader + actions slot">
          <template #actions>
            <Button size="sm" variant="outline">Action</Button>
          </template>
        </PageHeader>
        <Breadcrumbs class="mt-2" :items="[{ label: 'Admin', to: '/admin' }, { label: 'Playground' }]" />
        <div class="mt-4 max-w-xs">
          <StatCard label="Example" :value="42" :delta="{ value: '2%', trend: 'up' }" :icon="Users" />
        </div>
        <Separator class="my-6" />
          <div class="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm" :loading="true">Loading</Button>
          </div>
        </section>
      </div>

      <div v-show="playgroundTab === 'feedback'" class="mt-6 space-y-6">
        <Alert variant="info" title="Info">Supporting line for info.</Alert>
        <Alert variant="success" title="Success">Operation completed.</Alert>
        <Alert variant="warning" title="Warning">Check this before continuing.</Alert>
        <Alert variant="destructive" title="Error">Something went wrong.</Alert>
        <div class="space-y-2">
        <div class="max-w-md">
          <Progress :value="60" />
        </div>
          <div class="flex items-center gap-2">
            <Spinner size="sm" />
            <Spinner />
          </div>
          <Skeleton class="h-10 w-full max-w-md" />
        </div>
        <Empty title="Empty state" description="No items to show." />
      </div>

      <div v-show="playgroundTab === 'overlays'" class="mt-6 space-y-4">
        <div class="flex flex-wrap gap-2">
          <Button @click="dialogOpen = true">Open dialog</Button>
          <Button variant="outline" @click="drawerOpen = true">Open drawer</Button>
          <Popover :open="popOpen" @update:open="popOpen = $event">
            <template #trigger>
              <Button variant="secondary" type="button">Popover</Button>
            </template>
            <p class="max-w-xs text-sm">Popover content for positioning checks.</p>
          </Popover>
          <Tooltip content="Tooltip copy" side="top">
            <template #trigger>
              <Button variant="ghost" size="sm" type="button">Hover me</Button>
            </template>
          </Tooltip>
        </div>
        <Dialog v-model:open="dialogOpen" title="Example dialog" description="Focus trap and Esc to close.">
          <p class="text-sm text-[var(--muted-foreground)]">Dialog body slot.</p>
        </Dialog>
        <Drawer v-model:open="drawerOpen" side="left" size="16rem">
          <p class="text-sm">Drawer panel for small screens pattern.</p>
        </Drawer>
      </div>

      <div v-show="playgroundTab === 'data'" class="mt-6 space-y-6">
        <div class="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <Table>
          <table>
            <thead>
              <tr>
                <th class="border-b border-[var(--border)] p-2 text-left">Col</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-2">Cell</td>
              </tr>
            </tbody>
          </table>
        </Table>
        <DataTable :columns="dtCols" :data="dtRows" :empty="{ title: 'No rows', description: 'DataTable empty slot' }" />
        <Pagination
          :page="page"
          :page-size="10"
          :total="25"
          @update:page="page = $event"
        />
        <Chart type="bar" :data="{}" />
      </div>

      <div v-show="playgroundTab === 'navigation'" class="mt-6 space-y-6">
        <Breadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'UI', to: '/admin/ui' }]" />
        <Separator />
        <Collapsible v-model:open="collOpen">
          <template #trigger>
            <span>Collapsible</span>
          </template>
          <p class="text-sm text-[var(--muted-foreground)]">Nested disclosure content.</p>
        </Collapsible>
        <Accordion :items="accordionItems" />
      </div>

      <div v-show="playgroundTab === 'misc'" class="mt-6 space-y-6">
        <div class="flex items-center gap-3">
          <Avatar alt="Sample User" fallback="SU" />
          <span class="text-sm">Avatar + <Kbd>⌘</Kbd> <Kbd>K</Kbd></span>
        </div>
        <Typography as="p" variant="lead">Lead paragraph</Typography>
        <Typography as="p" variant="muted">Muted text for captions.</Typography>
        <Toggle v-model="toggleB">Toggle</Toggle>
        <Card>
          <Typography as="h3" variant="h3">Card</Typography>
          <p class="mt-2 text-sm text-[var(--muted-foreground)]">Surface + border token check.</p>
        </Card>
      </div>
    </Tabs>
  </div>
</template>
