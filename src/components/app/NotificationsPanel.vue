<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import Button from '@/components/ui/Button.vue'
import EmptyState from '@/components/app/EmptyState.vue'
import Spinner from '@/components/ui/Spinner.vue'

export type NotificationItem = {
  id: string
  title?: string
  time?: string
  titleKey?: string
  timeKey?: string
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

const { t } = useI18n()

function itemTitle(item: NotificationItem) {
  if (item.titleKey) {
    return t(item.titleKey)
  }
  return item.title ?? ''
}

function itemTime(item: NotificationItem) {
  if (item.timeKey) {
    return t(item.timeKey)
  }
  return item.time ?? ''
}
</script>

<template>
  <div class="w-80 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold text-[var(--foreground)]">{{ $t('notifications.title') }}</h3>
      <Button variant="ghost" size="sm" @click="emit('mark-all-read')">{{ $t('notifications.markAllRead') }}</Button>
    </div>
    <div v-if="loading" class="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
      <Spinner size="sm" />
      <span>{{ $t('notifications.loading') }}</span>
    </div>
    <div v-else-if="notifications.length === 0">
      <EmptyState :title="$t('notifications.emptyTitle')" :description="$t('notifications.emptyDescription')" />
    </div>
    <ul v-else class="space-y-2">
      <li v-for="item in notifications" :key="item.id" class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-2">
        <div class="flex items-start gap-2">
          <Bell class="mt-0.5 h-4 w-4 text-[var(--secondary)]" />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-[var(--card-foreground)]">{{ itemTitle(item) }}</p>
            <p class="text-xs text-[var(--muted-foreground)]">{{ itemTime(item) }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
