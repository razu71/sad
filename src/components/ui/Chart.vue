<script setup lang="ts">
import Empty from '@/components/ui/Empty.vue'

defineProps<{
  type: 'line' | 'bar' | 'area' | 'pie'
  data: unknown
  options?: unknown
}>()
</script>

<template>
  <Empty title="Charts coming soon" description="Chart library integration is intentionally deferred for now." />
</template>
