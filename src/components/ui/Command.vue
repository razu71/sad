<script setup lang="ts">
import Dialog from '@/components/ui/Dialog.vue'

type CommandItem = { label: string; shortcut?: string; onSelect: () => void }
type CommandGroup = { heading: string; items: CommandItem[] }

const props = defineProps<{
  open: boolean
  groups: CommandGroup[]
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <Dialog :open="props.open" title="Command palette" @update:open="emit('update:open', $event)">
    <div role="listbox" class="space-y-3">
      <section v-for="group in groups" :key="group.heading">
        <p class="mb-1 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">{{ group.heading }}</p>
        <button
          v-for="item in group.items"
          :key="item.label"
          type="button"
          class="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm hover:bg-[var(--accent)]"
          @click="item.onSelect(); emit('update:open', false)"
        >
          <span>{{ item.label }}</span>
          <span v-if="item.shortcut" class="text-xs text-[var(--muted-foreground)]">{{ item.shortcut }}</span>
        </button>
      </section>
    </div>
  </Dialog>
</template>
