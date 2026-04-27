<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { computed, ref, unref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useToast } from '@/components/ui/Toast'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import Field from '@/components/ui/Field.vue'
import Input from '@/components/ui/Input.vue'
import { fieldErrorDisplay } from '@/lib/form/fieldErrorDisplay'
import { focusFirstErrorField } from '@/lib/form/focusFirstErrorField'
import { useAuthStore } from '@/stores/auth'
import { loginSchema } from '@/schemas/auth.schemas'
import SocialAuthSection from '@/components/app/SocialAuthSection.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const emailId = 'login-email'
const passwordId = 'login-password'
const rememberId = 'login-remember'

const { handleSubmit, submitCount, meta: formMeta, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
    remember: true,
  },
  validateOnMount: false,
})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField<string>('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField<string>('password')
const { value: remember } = useField<boolean>('remember', undefined, {
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false,
})

const emailErr = computed(() => fieldErrorDisplay(unref(emailError), emailMeta, submitCount))
const passwordErr = computed(() => fieldErrorDisplay(unref(passwordError), passwordMeta, submitCount))

const serverError = ref<string | null>(null)
const canSubmit = computed(() => formMeta.value.valid)

function resolveRedirect(): string {
  const raw = route.query.redirect
  if (typeof raw === 'string' && raw.startsWith('/') && !raw.startsWith('//')) {
    return raw
  }

  return '/admin/dashboard'
}

const submitForm = handleSubmit(
  async (values) => {
    serverError.value = null

    try {
      await auth.login({
        email: values.email,
        password: values.password,
        remember: values.remember,
      })
      await router.push(resolveRedirect())
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign in failed.'
      serverError.value = msg
      toast.error(msg)
    }
  },
  (ctx) => {
    focusFirstErrorField(
      [
        { path: 'email', id: emailId },
        { path: 'password', id: passwordId },
      ],
      ctx.errors,
    )
  },
)
</script>

<template>
  <Card>
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Sign in</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Use <strong class="text-[var(--foreground)]">demo@example.com</strong> / <strong class="text-[var(--foreground)]">password123</strong> for the mock account.</p>

    <Alert v-if="serverError" variant="destructive" class="mt-4" :title="serverError" />

    <form class="mt-4 space-y-4" @submit.prevent="submitForm">
      <Field label="Email" :id="emailId" :error="emailErr" required>
        <template #default="{ id, describedby }">
          <Input
            :id="id"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            :invalid="Boolean(emailErr)"
            :aria-describedby="describedby"
          />
        </template>
      </Field>
      <Field label="Password" :id="passwordId" :error="passwordErr" required>
        <template #default="{ id, describedby }">
          <Input
            :id="id"
            v-model="password"
            type="password"
            autocomplete="current-password"
            :invalid="Boolean(passwordErr)"
            :aria-describedby="describedby"
          />
        </template>
      </Field>
      <div class="flex items-center gap-2">
        <Checkbox :id="rememberId" v-model="remember" label="Remember me" />
      </div>
      <Button type="submit" class="w-full" :disabled="!canSubmit" :loading="isSubmitting">
        {{ isSubmitting ? 'Signing in…' : 'Sign in' }}
      </Button>
    </form>

    <div class="mt-4 flex flex-col gap-2 text-sm text-[var(--muted-foreground)]">
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthForgotPassword' }">Forgot password?</RouterLink>
      <p>
        Don't have an account?
        <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthSignUp' }">Sign up</RouterLink>
      </p>
    </div>

    <SocialAuthSection class="mt-6" />
  </Card>
</template>
