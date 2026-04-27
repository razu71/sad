<script setup lang="ts">
import { ref } from 'vue'
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
  toast.success('Profile saved (mock).')
}

function saveAccount() {
  toast.success('Account settings saved (mock).')
}

function saveNotificationPrefs() {
  toast.success('Notification preferences updated.')
}
</script>

<template>
  <div>
    <PageHeader title="Settings" description="Profile, account, and appearance." />

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
            Profile
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
            Account
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
            Notifications
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
            Appearance
          </Button>
        </div>
      </template>

      <div v-show="tab === 'profile'" class="space-y-4 pt-4">
        <p class="text-sm text-[var(--muted-foreground)]">Avatar upload is a mock; paste a URL in a later iteration.</p>
        <div class="space-y-1.5">
          <Label for="settings-name" required>Name</Label>
          <Input id="settings-name" v-model="profileName" class="max-w-md" type="text" />
        </div>
        <div class="space-y-1.5">
          <Label for="settings-email" required>Email</Label>
          <Input id="settings-email" v-model="profileEmail" class="max-w-md" type="email" />
        </div>
        <div class="space-y-1.5 max-w-md">
          <Label for="settings-bio">Bio</Label>
          <Textarea id="settings-bio" v-model="profileBio" class="min-h-[100px] max-w-md" />
        </div>
        <Button type="button" @click="saveProfile">Save profile</Button>
      </div>

      <div v-show="tab === 'account'" class="space-y-4 pt-4">
        <div class="space-y-1.5 max-w-md">
          <Label for="tz">Time zone</Label>
          <NativeSelect id="tz" v-model="timeZone" class="max-w-md">
            <option value="UTC">UTC</option>
            <option value="America/New_York">America / New York</option>
            <option value="Europe/London">Europe / London</option>
          </NativeSelect>
        </div>
        <Button type="button" @click="saveAccount">Save account</Button>
      </div>

      <div v-show="tab === 'notifications'" class="space-y-4 pt-4">
        <div class="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
          <div>
            <p class="text-sm font-medium text-[var(--foreground)]">Product updates</p>
            <p class="text-xs text-[var(--muted-foreground)]">Occasional news and tips.</p>
          </div>
          <Switch v-model="notifyProduct" :aria-label="'Product updates'" />
        </div>
        <div class="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
          <div>
            <p class="text-sm font-medium text-[var(--foreground)]">Weekly summary</p>
            <p class="text-xs text-[var(--muted-foreground)]">Activity digest every Monday.</p>
          </div>
          <Switch v-model="notifyWeekly" :aria-label="'Weekly summary'" />
        </div>
        <div class="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
          <div>
            <p class="text-sm font-medium text-[var(--foreground)]">Security alerts</p>
            <p class="text-xs text-[var(--muted-foreground)]">Logins and password changes.</p>
          </div>
          <Switch v-model="notifySecurity" :aria-label="'Security alerts'" />
        </div>
        <Button type="button" @click="saveNotificationPrefs">Save notification preferences</Button>
      </div>

      <div v-show="tab === 'appearance'" class="space-y-6 pt-4">
        <div>
          <h3 class="text-sm font-medium text-[var(--foreground)]">Theme</h3>
          <p class="mt-1 text-xs text-[var(--muted-foreground)]">Applies immediately across the app.</p>
          <div class="mt-3 max-w-md">
            <ThemeToggle variant="segmented" />
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--foreground)]">Preview</h3>
          <Card class="mt-2 max-w-md">
            <p class="text-sm text-[var(--foreground)]">Card surface in the current mode.</p>
            <p class="mt-2 text-sm text-[var(--muted-foreground)]">Muted supporting text and inputs.</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
            </div>
            <p class="mt-3 text-xs text-[var(--muted-foreground)]">Resolved: {{ ui.resolvedTheme }}</p>
          </Card>
        </div>

        <div>
          <h3 class="text-sm font-medium text-[var(--muted-foreground)]">Future</h3>
          <ul class="mt-2 list-inside list-disc text-sm text-[var(--muted-foreground)]">
            <li>Density</li>
            <li>Sidebar default state</li>
            <li>Reduce motion</li>
          </ul>
        </div>
      </div>
    </Tabs>
  </div>
</template>
