<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { computed, ref, unref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from '@/components/ui/Toast'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Field from '@/components/ui/Field.vue'
import Input from '@/components/ui/Input.vue'
import { fieldErrorDisplay } from '@/lib/form/fieldErrorDisplay'
import { focusFirstErrorField } from '@/lib/form/focusFirstErrorField'
import { useAuthStore } from '@/stores/auth'
import { signUpSchema } from '@/schemas/auth.schemas'
import SocialAuthSection from '@/components/app/SocialAuthSection.vue'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const nameId = 'signup-name'
const emailId = 'signup-email'
const passwordId = 'signup-password'

const { handleSubmit, submitCount, meta: formMeta, isSubmitting } = useForm({
  validationSchema: toTypedSchema(signUpSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
  },
  validateOnMount: false,
})

const { value: name, errorMessage: nameError, meta: nameMeta } = useField<string>('name')
const { value: email, errorMessage: emailError, meta: emailMeta } = useField<string>('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField<string>('password')

const nameErr = computed(() => fieldErrorDisplay(unref(nameError), nameMeta, submitCount))
const emailErr = computed(() => fieldErrorDisplay(unref(emailError), emailMeta, submitCount))
const passwordErr = computed(() => fieldErrorDisplay(unref(passwordError), passwordMeta, submitCount))

const passwordStrength = computed(() => {
  const p = String(unref(password) ?? '')
  let score = 0
  if (p.length >= 8) {
    score++
  }
  if (/[0-9]/.test(p)) {
    score++
  }
  if (/[^A-Za-z0-9]/.test(p)) {
    score++
  }
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) {
    score++
  }
  return Math.min(score, 4)
})

const strengthLabel = computed(() => {
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[passwordStrength.value] ?? ''
})

const canSubmit = computed(() => formMeta.value.valid)

const serverError = ref<string | null>(null)

const submitForm = handleSubmit(
  async (values) => {
    serverError.value = null

    try {
      await auth.signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      await router.push('/admin/dashboard')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not create account.'
      serverError.value = msg
      toast.error(msg)
    }
  },
  (ctx) => {
    focusFirstErrorField(
      [
        { path: 'name', id: nameId },
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
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Create account</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Mock sign-up stores your profile in localStorage for this browser only.</p>

    <Alert v-if="serverError" variant="destructive" class="mt-4" :title="serverError" />

    <form class="mt-4 space-y-4" @submit.prevent="submitForm">
      <Field label="Name" :id="nameId" :error="nameErr" required>
        <template #default="{ id, describedby }">
          <Input
            :id="id"
            v-model="name"
            type="text"
            autocomplete="name"
            :invalid="Boolean(nameErr)"
            :aria-describedby="describedby"
          />
        </template>
      </Field>
      <Field label="Email" :id="emailId" :error="emailErr" required>
        <template #default="{ id, describedby }">
          <Input
            :id="id"
            v-model="email"
            type="email"
            autocomplete="email"
            :invalid="Boolean(emailErr)"
            :aria-describedby="describedby"
          />
        </template>
      </Field>
      <Field
        label="Password"
        :id="passwordId"
        :error="passwordErr"
        description="At least 8 characters."
        required
      >
        <template #default="{ id, describedby }">
          <Input
            :id="id"
            v-model="password"
            type="password"
            autocomplete="new-password"
            :invalid="Boolean(passwordErr)"
            :aria-describedby="describedby"
          />
        </template>
      </Field>
      <div v-if="String(password ?? '').length > 0" class="space-y-1" aria-hidden="true">
        <div class="h-1.5 overflow-hidden rounded-full bg-[var(--muted)]">
          <div
            class="h-full rounded-full bg-[var(--secondary)] transition-all"
            :style="{ width: `${(passwordStrength / 4) * 100}%` }"
          />
        </div>
        <p class="text-xs text-[var(--muted-foreground)]">{{ strengthLabel }}</p>
      </div>
      <Button type="submit" class="w-full" :disabled="!canSubmit" :loading="isSubmitting">
        {{ isSubmitting ? 'Creating account…' : 'Create account' }}
      </Button>
    </form>

    <p class="mt-4 text-sm text-[var(--muted-foreground)]">
      Already have an account?
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthLogin' }">Sign in</RouterLink>
    </p>

    <SocialAuthSection class="mt-6" />
  </Card>
</template>
