<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import EmptyState from '@/components/app/EmptyState.vue'
import Spinner from '@/components/ui/Spinner.vue'

export type NotificationItem = {
  id: string
  title: string
  time: string
  read?: boolean
}

const props = withDefaults(defineProps<{
  notifications: NotificationItem[]
  loading?: boolean
}>(), {
  loading: false,
})

const emit = defineEmits<{
  'mark-all-read': []
}>()
</script>

<template>
  <div class="w-80 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold text-[var(--foreground)]">Notifications</h3>
      <Button variant="ghost" size="sm" @click="emit('mark-all-read')">Mark all as read</Button>
    </div>
    <div v-if="loading" class="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
      <Spinner size="sm" />
      <span>Loading...</span>
    </div>
    <div v-else-if="notifications.length === 0">
      <EmptyState title="No notifications" description="You're all caught up." />
    </div>
    <ul v-else class="space-y-2">
      <li v-for="item in notifications" :key="item.id" class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-2">
        <div class="flex items-start gap-2">
          <Bell class="mt-0.5 h-4 w-4 text-[var(--secondary)]" />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-[var(--card-foreground)]">{{ item.title }}</p>
            <p class="text-xs text-[var(--muted-foreground)]">{{ item.time }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
