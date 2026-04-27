<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Typography from '@/components/ui/Typography.vue'

const props = defineProps<{
  label: string
  value: string | number
  delta?: { value: string; trend: 'up' | 'down' | 'flat' }
  icon?: Component
}>()

const trendIcon = computed(() => {
  if (props.delta?.trend === 'up') {
    return ArrowUpRight
  }

  if (props.delta?.trend === 'down') {
    return ArrowDownRight
  }

  return ArrowRight
})

const trendClass = computed(() => {
  if (props.delta?.trend === 'up') {
    return 'text-[var(--secondary)]'
  }

  if (props.delta?.trend === 'down') {
    return 'text-[var(--destructive)]'
  }

  return 'text-[var(--muted-foreground)]'
})
</script>

<template>
  <Card>
    <div class="flex items-start justify-between gap-3">
      <div>
        <Typography as="p" variant="muted">{{ label }}</Typography>
        <Typography as="p" variant="h2" class="mt-1">{{ value }}</Typography>
        <p v-if="delta" :class="['mt-1 inline-flex items-center gap-1 text-sm', trendClass]">
          <component :is="trendIcon" class="h-4 w-4" />
          <span>{{ delta.value }}</span>
        </p>
      </div>
      <component v-if="icon" :is="icon" class="h-5 w-5 text-[var(--secondary)]" />
    </div>
  </Card>
</template>
