<script setup lang="ts">
import { ref } from 'vue'
import { MoreHorizontal } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'

type UserRow = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  active: boolean
  created: string
}

const props = defineProps<{
  user: UserRow
}>()

const emit = defineEmits<{
  edit: [user: UserRow]
  remove: [user: UserRow]
}>()

const open = ref(false)

function onEdit() {
  emit('edit', props.user)
}

function onDelete() {
  emit('remove', props.user)
}
</script>

<template>
  <div class="flex justify-end" @click.stop>
    <DropdownMenu :open="open" @update:open="open = $event">
      <template #trigger>
        <Button size="icon" variant="ghost" :aria-label="`Actions for ${user.name}`" @click.stop>
          <MoreHorizontal class="h-4 w-4" />
        </Button>
      </template>
      <li>
        <button
          type="button"
          role="menuitem"
          class="flex w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]"
          @click="onEdit"
        >
          Edit
        </button>
      </li>
      <li>
        <button
          type="button"
          role="menuitem"
          class="flex w-full rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm text-[var(--destructive)] hover:bg-[var(--accent)]"
          @click="onDelete"
        >
          Delete
        </button>
      </li>
    </DropdownMenu>
  </div>
</template>
