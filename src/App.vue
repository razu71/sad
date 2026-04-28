<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { i18n } from '@/lib/i18n'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const { locale } = useI18n()
const ui = useUiStore()
const { locale: uiLocale } = storeToRefs(ui)

watch(uiLocale, (value) => {
  locale.value = value
}, { immediate: true })

watch(
  () => [route.fullPath, locale.value] as const,
  () => {
    const piece = typeof route.meta.title === 'string' ? String(route.meta.title) : ''
    const appName = String(i18n.global.t('app.name'))
    document.title = piece ? `${String(i18n.global.t(piece))} · ${appName}` : appName
  },
  { immediate: true },
)
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
