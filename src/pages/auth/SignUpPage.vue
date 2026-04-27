<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const nameId = 'signup-name'
const emailId = 'signup-email'
const passwordId = 'signup-password'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  errorMessage.value = null

  if (!name.value.trim()) {
    errorMessage.value = 'Name is required.'
    return
  }

  if (!email.value.trim()) {
    errorMessage.value = 'Email is required.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters.'
    return
  }

  loading.value = true

  try {
    await auth.signUp({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    await router.push('/admin/dashboard')
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Could not create account.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Create account</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Mock sign-up stores your profile in localStorage for this browser only.</p>

    <Alert v-if="errorMessage" variant="destructive" class="mt-4" :title="errorMessage" />

    <form class="mt-4 space-y-4" @submit.prevent="onSubmit">
      <div class="space-y-2">
        <Label :for="nameId" required>Name</Label>
        <Input :id="nameId" v-model="name" type="text" autocomplete="name" />
      </div>
      <div class="space-y-2">
        <Label :for="emailId" required>Email</Label>
        <Input :id="emailId" v-model="email" type="email" autocomplete="email" />
      </div>
      <div class="space-y-2">
        <Label :for="passwordId" required>Password</Label>
        <Input :id="passwordId" v-model="password" type="password" autocomplete="new-password" />
        <p class="text-xs text-[var(--muted-foreground)]">At least 8 characters.</p>
      </div>
      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? 'Creating account…' : 'Create account' }}
      </Button>
    </form>

    <p class="mt-4 text-sm text-[var(--muted-foreground)]">
      Already have an account?
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthLogin' }">Sign in</RouterLink>
    </p>
  </Card>
</template>
