<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { adminNav } from '@/lib/nav'

type Crumb = { label: string; to?: string }

const props = defineProps<{
  items?: Crumb[]
}>()

const route = useRoute()

function findLabel(path: string): string | undefined {
  const stack = [...adminNav]
  while (stack.length) {
    const item = stack.shift()
    if (!item) {
      continue
    }

    if (item.to === path) {
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

