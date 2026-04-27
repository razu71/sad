<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { nav } from '@/lib/nav'
import type { NavItem } from '@/types/NavItem'

type Crumb = { label: string; to?: string }

const props = defineProps<{
  items?: Crumb[]
}>()

const route = useRoute()

function findLabel(path: string): string | undefined {
  const stack: NavItem[] = [...nav]
  while (stack.length) {
    const item = stack.shift()
    if (!item) {
      continue
    }

    if (typeof item.to === 'string' && item.to === path) {
      return item.label
    }

    if (item.children?.length) {
      stack.push(...item.children)
    }
  }

  return undefined
}

const crumbs = computed<Crumb[]>(() => {
  if (props.items?.length) {
    return props.items
  }

  return route.matched
    .filter((record) => record.path)
    .map((record) => ({
      label: typeof record.meta?.title === 'string' ? String(record.meta.title) : (findLabel(record.path) ?? record.path),
      to: record.path,
    }))
})
</script>

<template>
  <Breadcrumb :items="crumbs" />
</template>

