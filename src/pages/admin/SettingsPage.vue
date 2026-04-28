<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/components/ui/Toast'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import NativeSelect from '@/components/ui/NativeSelect.vue'
import PageHeader from '@/components/app/PageHeader.vue'
import Switch from '@/components/ui/Switch.vue'
import Tabs from '@/components/ui/Tabs.vue'
import Textarea from '@/components/ui/Textarea.vue'
import ThemeToggle from '@/components/app/ThemeToggle.vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const toast = useToast()
const { t } = useI18n()
const auth = useAuthStore()
const ui = useUiStore()

const tab = ref('profile')
const timeZone = ref('UTC')

const profileName = ref(auth.user?.name ?? 'Demo User')
const profileEmail = ref(auth.user?.email ?? 'demo@example.com')
const profileBio = ref('Product designer building admin tools.')

const notifyProduct = ref(true)
const notifyWeekly = ref(false)
const notifySecurity = ref(true)

function saveProfile() {
  toast.success(t('toast.profileSaved'))
}

function saveAccount() {
  toast.success(t('toast.accountSaved'))
}

function saveNotificationPrefs() {
  toast.success(t('toast.notificationsSaved'))
}
</script>

<template>
  <div>
    <PageHeader :title="t('settings.title')" :description="t('settings.description')" />

    <Tabs v-model="tab" class="mt-2">
      <template #tabs="{ modelValue, setValue }">
        <div class="flex flex-wrap gap-2 border-b border-[var(--border)] pb-2">
          <Button
            type="button"
            role="tab"
            variant="ghost"
            size="sm"
            :class="`rounded-[var(--radius-sm)] ${modelValue === 'profile' ? 'bg-[var(--accent)] text-[var(--accent-foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`"
            :aria-selected="modelValue === 'profile'"
            @click="setValue('profile')"
          >
            {{ t('settings.tabs.profile') }}
          </Button>
          <Button
            type="button"
            role="tab"
            variant="ghost"
            size="sm"
            :class="`rounded-[var(--radius-sm)] ${modelValue === 'account' ? 'bg-[var(--accent)] text-[var(--accent-foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`"
            :aria-selected="modelValue === 'account'"
            @click="setValue('account')"
          >
            {{ t('settings.tabs.account') }}
          </Button>
          <Button
            type="button"
            role="tab"
            variant="ghost"
            size="sm"
            :class="`rounded-[var(--radius-sm)] ${modelValue === 'notifications' ? 'bg-[var(--accent)] text-[var(--accent-foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`"
            :aria-selected="modelValue === 'notifications'"
            @click="setValue('notifications')"
          >
            {{ t('settings.tabs.notifications') }}
          </Button>
          <Button
            type="button"
            role="tab"
            variant="ghost"
            size="sm"
            :class="`rounded-[var(--radius-sm)] ${modelValue === 'appearance' ? 'bg-[var(--accent)] text-[var(--accent-foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`"
            :aria-selected="modelValue === 'appearance'"
            @click="setValue('appearance')"
          >
            {{ t('settings.tabs.appearance') }}
          </Button>
        </div>
      </template>

      <div v-show="tab === 'profile'" class="space-y-4 pt-4">
        <p class="text-sm text-[var(--muted-foreground)]">{{ t('settings.profile.avatarHint') }}</p>
        <div class="space-y-1.5">
          <Label for="settings-name" required>{{ t('settings.profile.name') }}</Label>
          <Input id="settings-name" v-model="profileName" class="max-w-md" type="text" />
        </div>
        <div class="space-y-1.5">
          <Label for="settings-email" required>{{ t('settings.profile.email') }}</Label>
          <Input id="settings-email" v-model="profileEmail" class="max-w-md" type="email" />
        </div>
        <div class="space-y-1.5 max-w-md">
          <Label for="settings-bio">{{ t('settings.profile.bio') }}</Label>
          <Textarea id="settings-bio" v-model="profileBio" class="min-h-[100px] max-w-md" />
        </div>
        <Button type="button" @click="saveProfile">{{ t('settings.profile.saveProfile') }}</Button>
      </div>

      <div v-show="tab === 'account'" class="space-y-4 pt-4">
        <div class="space-y-1.5 max-w-md">
          <Label for="tz">{{ t('settings.account.timeZone') }}</Label>
          <NativeSelect id="tz" v-model="timeZone" class="max-w-md">
            <option value="UTC">UTC</option>
            <option value="America/New_York">America / New York</option>
            <option value="Europe/London">Europe / London</option>
          </NativeSelect>
        </div>
        <Button type="button" @click="saveAccount">{{ t('settings.account.saveAccount') }}</Button>
      </div>

      <div v-show="tab === 'notifications'" class="space-y-4 pt-4">
        <div class="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
          <div>
            <p class="text-sm font-medium text-[var(--foreground)]">{{ t('settings.notifications.productTitle') }}</p>
            <p class="text-xs text-[var(--muted-foreground)]">{{ t('settings.notifications.productDescription') }}</p>
          </div>
          <Switch v-model="notifyProduct" :aria-label="t('settings.notifications.productTitle')" />
        </div>
        <div class="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
          <div>
            <p class="text-sm font-medium text-[var(--foreground)]">{{ t('settings.notifications.weeklyTitle') }}</p>
            <p class="text-xs text-[var(--muted-foreground)]">{{ t('settings.notifications.weeklyDescription') }}</p>
          </div>
          <Switch v-model="notifyWeekly" :aria-label="t('settings.notifications.weeklyTitle')" />
        </div>
        <div class="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
          <div>
            <p class="text-sm font-medium text-[var(--foreground)]">{{ t('settings.notifications.securityTitle') }}</p>
            <p class="text-xs text-[var(--muted-foreground)]">{{ t('settings.notifications.securityDescription') }}</p>
          </div>
          <Switch v-model="notifySecurity" :aria-label="t('settings.notifications.securityTitle')" />
        </div>
        <Button type="button" @click="saveNotificationPrefs">{{ t('settings.notifications.save') }}</Button>
      </div>

      <div v-show="tab === 'appearance'" class="space-y-6 pt-4">
        <div>
          <h3 class="text-sm font-medium text-[var(--foreground)]">{{ t('settings.appearance.themeTitle') }}</h3>
          <p class="mt-1 text-xs text-[var(--muted-foreground)]">{{ t('settings.appearance.themeDescription') }}</p>
          <div class="mt-3 max-w-md">
            <ThemeToggle variant="segmented" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--foreground)]">{{ t('settings.appearance.previewTitle') }}</h3>
          <Card class="mt-2 max-w-md">
            <p class="text-sm text-[var(--foreground)]">{{ t('settings.appearance.previewCard') }}</p>
            <p class="mt-2 text-sm text-[var(--muted-foreground)]">{{ t('settings.appearance.previewMuted') }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <Button size="sm">{{ t('settings.appearance.primary') }}</Button>
              <Button size="sm" variant="secondary">{{ t('settings.appearance.secondary') }}</Button>
            </div>
            <p class="mt-3 text-xs text-[var(--muted-foreground)]">{{ t('settings.appearance.resolved') }}: {{ ui.resolvedTheme }}</p>
          </Card>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--muted-foreground)]">{{ t('settings.appearance.futureTitle') }}</h3>
          <ul class="mt-2 list-inside list-disc text-sm text-[var(--muted-foreground)]">
            <li>{{ t('settings.appearance.futureDensity') }}</li>
            <li>{{ t('settings.appearance.futureSidebar') }}</li>
            <li>{{ t('settings.appearance.futureMotion') }}</li>
          </ul>
        </div>
      </div>
    </Tabs>
  </div>
</template>
