<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const emailId = 'login-email'
const passwordId = 'login-password'
const rememberId = 'login-remember'

const email = ref('')
const password = ref('')
const remember = ref(true)
const loading = ref(false)
const errorMessage = ref<string | null>(null)

function resolveRedirect(): string {
  const raw = route.query.redirect
  if (typeof raw === 'string' && raw.startsWith('/') && !raw.startsWith('//')) {
    return raw
  }

  return '/admin/dashboard'
}

async function onSubmit() {
  errorMessage.value = null
  loading.value = true

  try {
    await auth.login({
      email: email.value,
      password: password.value,
      remember: remember.value,
    })
    await router.push(resolveRedirect())
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Sign in failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Card>
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Sign in</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Use <strong class="text-[var(--foreground)]">demo@example.com</strong> / <strong class="text-[var(--foreground)]">password123</strong> for the mock account.</p>

    <Alert v-if="errorMessage" variant="destructive" class="mt-4" :title="errorMessage" />

    <form class="mt-4 space-y-4" @submit.prevent="onSubmit">
      <div class="space-y-2">
        <Label :for="emailId" required>Email</Label>
        <Input :id="emailId" v-model="email" type="email" autocomplete="email" placeholder="you@example.com" />
      </div>
      <div class="space-y-2">
        <Label :for="passwordId" required>Password</Label>
        <Input :id="passwordId" v-model="password" type="password" autocomplete="current-password" />
      </div>
      <div class="flex items-center gap-2">
        <Checkbox :id="rememberId" v-model="remember" label="Remember me" />
      </div>
      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </Button>
    </form>

    <div class="mt-4 flex flex-col gap-2 text-sm text-[var(--muted-foreground)]">
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthForgotPassword' }">Forgot password?</RouterLink>
      <p>
        Don't have an account?
        <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthSignUp' }">Sign up</RouterLink>
      </p>
    </div>
  </Card>
</template>
