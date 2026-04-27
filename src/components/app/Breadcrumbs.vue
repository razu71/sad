<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

type Crumb = { label: string; to: string }

export default defineComponent({
  setup() {
    const route = useRoute()
    const crumbs = computed<Crumb[]>(() => {
      const matched = route.matched.filter((r) => typeof r.meta?.title === 'string' && r.path)
      return matched.map((r) => ({ label: String(r.meta.title), to: r.path }))
    })
    return { crumbs }
  },
})
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-[var(--text-main)]/80">
    <template v-for="(c, idx) in crumbs" :key="c.to">
      <span v-if="idx !== 0" class="text-[var(--text-main)]/40">/</span>
      <RouterLink class="hover:text-[var(--text-main)]" :to="c.to">{{ c.label }}</RouterLink>
    </template>
  </div>
</template>

