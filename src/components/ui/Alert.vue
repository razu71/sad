<script setup lang="ts">
import { computed } from 'vue'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const props = withDefaults(defineProps<{
  variant: 'info' | 'success' | 'warning' | 'destructive'
  title?: string
  dismissible?: boolean
}>(), {
  dismissible: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

const icon = computed(() => ({
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: AlertCircle,
}[props.variant]))

const classes = computed(() => ({
  info: 'border-[var(--info)]/40 bg-[var(--info)]/10',
  success: 'border-[var(--success)]/40 bg-[var(--success)]/10',
  warning: 'border-[var(--warning)]/40 bg-[var(--warning)]/10',
  destructive: 'border-[var(--destructive)]/40 bg-[var(--destructive)]/10',
}[props.variant]))
</script>

<template>
  <div :role="variant === 'warning' || variant === 'destructive' ? 'alert' : 'status'" :class="['rounded-[var(--radius-md)] border p-3 text-[var(--foreground)]', classes]">
    <div class="flex items-start gap-3">
      <slot name="icon">
        <component :is="icon" class="mt-0.5 h-4 w-4 shrink-0" />
      </slot>
      <div class="min-w-0 flex-1">
        <p v-if="title" class="font-medium">{{ title }}</p>
        <div class="text-sm">
          <slot />
        </div>
        <div v-if="$slots.actions" class="mt-2">
          <slot name="actions" />
        </div>
      </div>
      <Button v-if="dismissible" variant="ghost" size="icon" aria-label="Dismiss alert" @click="emit('dismiss')">×</Button>
    </div>
  </div>
</template>
