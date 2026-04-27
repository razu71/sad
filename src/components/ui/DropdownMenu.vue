<script setup lang="ts">
import Popover from '@/components/ui/Popover.vue'

export type MenuItem = {
  label: string
  shortcut?: string
  disabled?: boolean
  onSelect?: () => void
}

const props = withDefaults(defineProps<{
  open?: boolean
  items?: MenuItem[]
}>(), {
  open: false,
  items: () => [],
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function select(item: MenuItem) {
  if (item.disabled) {
    return
  }

  item.onSelect?.()
  emit('update:open', false)
}
</script>

<template>
  <Popover :open="open" @update:open="emit('update:open', $event)">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <ul role="menu" class="space-y-1">
      <slot>
        <li v-for="item in items" :key="item.label">
          <button
            type="button"
            role="menuitem"
            :disabled="item.disabled"
            class="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm text-[var(--card-foreground)] hover:bg-[var(--accent)] disabled:opacity-50"
            @click="select(item)"
          >
            <span>{{ item.label }}</span>
            <span v-if="item.shortcut" class="text-xs text-[var(--muted-foreground)]">{{ item.shortcut }}</span>
          </button>
        </li>
      </slot>
    </ul>
  </Popover>
</template>
