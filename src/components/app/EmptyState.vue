<script setup lang="ts">
import type { Component } from 'vue'
import Empty from '@/components/ui/Empty.vue'
import Button from '@/components/ui/Button.vue'

withDefaults(defineProps<{
  title: string
  description?: string
  icon?: Component
  ctaLabel?: string
}>(), {
  ctaLabel: undefined,
})

const emit = defineEmits<{
  cta: []
}>()
</script>

<template>
  <Empty :title="title" :description="description" :icon="icon">
    <template v-if="ctaLabel || $slots.actions" #actions>
      <slot name="actions">
        <Button variant="primary" size="sm" @click="emit('cta')">{{ ctaLabel }}</Button>
      </slot>
    </template>
  </Empty>
</template>
