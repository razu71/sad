<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import type { ColumnDef } from '@tanstack/vue-table'
import { useField, useForm } from 'vee-validate'
import { computed, h, ref, unref, watch } from 'vue'
import { useToast } from '@/components/ui/Toast'
import UserRowActions from '@/components/app/UserRowActions.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import ConfirmDialog from '@/components/app/ConfirmDialog.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DataTable from '@/components/ui/DataTable.vue'
import Field from '@/components/ui/Field.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import NativeSelect from '@/components/ui/NativeSelect.vue'
import PageHeader from '@/components/app/PageHeader.vue'
import Switch from '@/components/ui/Switch.vue'
import { fieldErrorDisplay } from '@/lib/form/fieldErrorDisplay'
import { focusFirstErrorField } from '@/lib/form/focusFirstErrorField'
import { formatDate } from '@/lib/utils'
import { userFormSchema } from '@/schemas/userForm.schemas'
import type { UserFormValues } from '@/schemas/userForm.schemas'

export type UserRow = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  active: boolean
  created: string
}

const toast = useToast()

const roleFilter = ref<'all' | 'admin' | 'editor' | 'viewer'>('all')
const search = ref('')

const users = ref<UserRow[]>([
  { id: '1', name: 'Avery Brooks', email: 'avery@example.com', role: 'admin', active: true, created: '2024-12-10T10:00:00.000Z' },
  { id: '2', name: 'Jordan Lee', email: 'jordan@example.com', role: 'editor', active: true, created: '2025-01-15T12:00:00.000Z' },
  { id: '3', name: 'Sam Rivera', email: 'sam@example.com', role: 'viewer', active: false, created: '2025-02-20T15:00:00.000Z' },
  { id: '4', name: 'Riley Chen', email: 'riley@example.com', role: 'editor', active: true, created: '2025-03-01T08:00:00.000Z' },
])

const dialogOpen = ref(false)
const editingId = ref<string | null>(null)
const deleteTarget = ref<UserRow | null>(null)
const confirmOpen = ref(false)

const nameId = 'user-form-name'
const emailId = 'user-form-email'
const roleId = 'user-form-role'

const { handleSubmit, submitCount, meta: formMeta, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues: {
    name: '',
    email: '',
    role: 'editor' as UserFormValues['role'],
    active: true,
  },
  validateOnMount: false,
})

const { value: name, errorMessage: nameError, meta: nameMeta } = useField<string>('name')
const { value: email, errorMessage: emailError, meta: emailMeta } = useField<string>('email')
const { value: role } = useField<UserFormValues['role']>('role')
const { value: active } = useField<boolean>('active')

const nameErr = computed(() => fieldErrorDisplay(unref(nameError), nameMeta, submitCount))
const emailErr = computed(() => fieldErrorDisplay(unref(emailError), emailMeta, submitCount))

const roleOptions = [
  { value: 'all', label: 'All roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
] as const

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return users.value.filter((u) => {
    if (roleFilter.value !== 'all' && u.role !== roleFilter.value) {
      return false
    }
    if (!q) {
      return true
    }
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })
})

const dialogTitle = computed(() => (editingId.value ? 'Edit user' : 'Add user'))

const columns = computed<ColumnDef<UserRow>[]>(() => [
  {
    id: 'user',
    accessorKey: 'name',
    header: 'User',
    enableSorting: true,
    cell: (info) => {
      const u = info.row.original
      return h('div', { class: 'flex items-center gap-2' }, [
        h(Avatar, { alt: u.name, fallback: u.name, size: 'sm' }),
        h('span', { class: 'text-sm font-medium text-[var(--foreground)]' }, u.name),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableSorting: true,
    cell: (info) => h('span', { class: 'text-sm text-[var(--muted-foreground)]' }, String(info.getValue() ?? '')),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    enableSorting: true,
    cell: (info) => h(Badge, { variant: 'secondary' }, { default: () => String(info.getValue() ?? '') }),
  },
  {
    id: 'active',
    accessorKey: 'active',
    header: 'Status',
    enableSorting: false,
    cell: (info) => {
      const u = info.row.original
      return h(Switch, { modelValue: u.active, 'onUpdate:modelValue': (v: boolean) => toggleUserActive(u, v) })
    },
  },
  {
    accessorKey: 'created',
    header: 'Created',
    enableSorting: true,
    cell: (info) =>
      h('span', { class: 'text-sm text-[var(--muted-foreground)]' }, formatDate(String(info.getValue() ?? ''))),
  },
  {
    id: 'actions',
    header: '',
    enableSorting: false,
    cell: (info) =>
      h(UserRowActions, { user: info.row.original, onEdit: () => openEdit(info.row.original), onRemove: () => askDelete(info.row.original) }),
  },
])

function openAdd() {
  editingId.value = null
  resetForm()
  dialogOpen.value = true
}

function openEdit(u: UserRow) {
  editingId.value = u.id
  setValues({
    name: u.name,
    email: u.email,
    role: u.role,
    active: u.active,
  })
  dialogOpen.value = true
}

function askDelete(u: UserRow) {
  deleteTarget.value = u
  confirmOpen.value = true
}

const submitUser = handleSubmit(
  (values) => {
    if (editingId.value) {
      const u = users.value.find((r) => r.id === editingId.value)
      if (u) {
        u.name = values.name
        u.email = values.email
        u.role = values.role
        u.active = values.active
      }
      toast.success('User updated.')
    } else {
      const row: UserRow = {
        id: `u-${Date.now()}`,
        name: values.name,
        email: values.email,
        role: values.role,
        active: values.active,
        created: new Date().toISOString(),
      }
      users.value = [row, ...users.value]
      toast.success('User added.')
    }
    dialogOpen.value = false
    resetForm()
  },
  (ctx) => {
    focusFirstErrorField(
      [
        { path: 'name', id: nameId },
        { path: 'email', id: emailId },
        { path: 'role', id: roleId },
      ],
      ctx.errors,
    )
  },
)

function confirmDelete() {
  if (!deleteTarget.value) {
    return
  }
  users.value = users.value.filter((u) => u.id !== deleteTarget.value!.id)
  toast.success('User removed.')
  confirmOpen.value = false
  deleteTarget.value = null
}

function toggleUserActive(u: UserRow, value: boolean) {
  const row = users.value.find((r) => r.id === u.id)
  if (row) {
    row.active = value
    toast.success('Status updated.')
  }
}

watch(dialogOpen, (open) => {
  if (!open) {
    editingId.value = null
    resetForm()
  }
})
</script>

<template>
  <div>
    <PageHeader title="Users" description="Manage who can access the workspace.">
      <template #actions>
        <Button type="button" @click="openAdd">Add user</Button>
      </template>
    </PageHeader>

    <div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
      <Input v-model="search" class="max-w-xs" type="search" placeholder="Search name or email" />
      <NativeSelect v-model="roleFilter" class="w-full sm:w-48">
        <option v-for="o in roleOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </NativeSelect>
    </div>

    <DataTable
      :columns="columns"
      :data="filtered"
      :pagination="false"
      :sorting="true"
      :empty="{ title: 'No users', description: 'Try adjusting search or filters.' }"
    />

    <Dialog :open="dialogOpen" :title="dialogTitle" @update:open="dialogOpen = $event">
      <form class="space-y-4" @submit.prevent="submitUser">
        <Field label="Name" :id="nameId" :error="nameErr" required>
          <template #default="{ id, describedby }">
            <Input :id="id" v-model="name" :invalid="Boolean(nameErr)" :aria-describedby="describedby" />
          </template>
        </Field>
        <Field label="Email" :id="emailId" :error="emailErr" required>
          <template #default="{ id, describedby }">
            <Input :id="id" v-model="email" type="email" :invalid="Boolean(emailErr)" :aria-describedby="describedby" />
          </template>
        </Field>
        <div class="space-y-1.5">
          <Label :for="roleId" required>Role</Label>
          <NativeSelect :id="roleId" v-model="role">
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </NativeSelect>
        </div>
        <div class="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
          <Label for="user-form-active" class="cursor-default">Active</Label>
          <Switch id="user-form-active" v-model="active" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" @click="dialogOpen = false">Cancel</Button>
          <Button type="submit" :disabled="!formMeta.valid" :loading="isSubmitting">Save</Button>
        </div>
      </form>
    </Dialog>

    <ConfirmDialog
      v-model:open="confirmOpen"
      title="Delete user?"
      :description="deleteTarget ? `This will remove ${deleteTarget.name} from the list.` : undefined"
      confirm-text="Delete"
      cancel-text="Cancel"
      variant="destructive"
      @confirm="confirmDelete"
    />
  </div>
</template>
