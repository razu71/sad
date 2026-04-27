<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const emailId = 'forgot-email'

const email = ref('')
const loading = ref(false)
const done = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  errorMessage.value = null

  if (!email.value.trim()) {
    errorMessage.value = 'Email is required.'
    return
  }

  loading.value = true

  try {
    await auth.forgotPassword(email.value.trim())
    done.value = true
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Forgot password</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Mock flow: no email is sent. Submit to continue.</p>

    <Alert v-if="errorMessage" variant="destructive" class="mt-4" :title="errorMessage" />
    <Alert v-else-if="done" variant="success" class="mt-4" title="If that email exists, reset instructions would be sent (mock)." />

    <form v-if="!done" class="mt-4 space-y-4" @submit.prevent="onSubmit">
      <div class="space-y-2">
        <Label :for="emailId" required>Email</Label>
        <Input :id="emailId" v-model="email" type="email" autocomplete="email" />
      </div>
      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? 'Sending…' : 'Send reset link' }}
      </Button>
    </form>

    <p class="mt-4 text-sm">
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthLogin' }">Back to sign in</RouterLink>
    </p>
  </Card>
</template>
