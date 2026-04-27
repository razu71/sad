<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()

const passwordId = 'reset-password'
const confirmId = 'reset-password-confirm'

const token = computed(() => (typeof route.query.token === 'string' ? route.query.token : ''))

const password = ref('')
const confirm = ref('')
const loading = ref(false)
const done = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  errorMessage.value = null

  if (!token.value) {
    errorMessage.value = 'Missing reset token in the URL.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters.'
    return
  }

  if (password.value !== confirm.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    await auth.resetPassword(token.value, password.value)
    done.value = true
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Could not reset password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Reset password</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Mock reset: token is accepted without server validation.</p>

    <Alert v-if="errorMessage" variant="destructive" class="mt-4" :title="errorMessage" />
    <Alert v-else-if="done" variant="success" class="mt-4" title="Your password has been updated (mock)." />

    <form v-if="!done" class="mt-4 space-y-4" @submit.prevent="onSubmit">
      <div class="space-y-2">
        <Label :for="passwordId" required>New password</Label>
        <Input :id="passwordId" v-model="password" type="password" autocomplete="new-password" />
      </div>
      <div class="space-y-2">
        <Label :for="confirmId" required>Confirm password</Label>
        <Input :id="confirmId" v-model="confirm" type="password" autocomplete="new-password" />
      </div>
      <Button type="submit" class="w-full" :disabled="loading || !token">
        {{ loading ? 'Saving…' : 'Save new password' }}
      </Button>
    </form>

    <p class="mt-4 text-sm">
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthLogin' }">Back to sign in</RouterLink>
    </p>
  </Card>
</template>
