<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { computed, ref, unref, watch } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useToast } from '@/components/ui/Toast'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Field from '@/components/ui/Field.vue'
import Input from '@/components/ui/Input.vue'
import { fieldErrorDisplay } from '@/lib/form/fieldErrorDisplay'
import { focusFirstErrorField } from '@/lib/form/focusFirstErrorField'
import { useAuthStore } from '@/stores/auth'
import { resetPasswordSchema } from '@/schemas/auth.schemas'
import SocialAuthSection from '@/components/app/SocialAuthSection.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const passwordId = 'reset-password'
const confirmId = 'reset-password-confirm'

const token = computed(() => (typeof route.query.token === 'string' ? route.query.token : ''))

const { handleSubmit, submitCount, meta: formMeta, isSubmitting } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    password: '',
    confirmPassword: '',
  },
  validateOnMount: false,
})

const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField<string>('password')
const { value: confirmPassword, errorMessage: confirmError, meta: confirmMeta } = useField<string>('confirmPassword')

const passwordErr = computed(() => fieldErrorDisplay(unref(passwordError), passwordMeta, submitCount))
const confirmErr = computed(() => fieldErrorDisplay(unref(confirmError), confirmMeta, submitCount))

const canSubmit = computed(() => formMeta.value.valid && Boolean(token.value))

const serverError = ref<string | null>(null)

watch(token, (t) => {
  if (!t) {
    serverError.value = 'Missing reset token in the URL.'
  } else {
    serverError.value = null
  }
}, { immediate: true })

const submitForm = handleSubmit(
  async (values) => {
    serverError.value = null

    if (!token.value) {
      const msg = 'Missing reset token in the URL.'
      serverError.value = msg
      toast.error(msg)
      return
    }

    try {
      await auth.resetPassword(token.value, values.password)
      toast.success('Password updated. You can sign in with your new password.')
      await router.push({ name: 'AuthLogin' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not reset password.'
      serverError.value = msg
      toast.error(msg)
    }
  },
  (ctx) => {
    focusFirstErrorField(
      [
        { path: 'password', id: passwordId },
        { path: 'confirmPassword', id: confirmId },
      ],
      ctx.errors,
    )
  },
)
</script>

<template>
  <Card>
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Reset password</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Mock reset: token is accepted without server validation.</p>

    <Alert v-if="serverError" variant="destructive" class="mt-4" :title="serverError" />

    <form class="mt-4 space-y-4" @submit.prevent="submitForm">
      <Field label="New password" :id="passwordId" :error="passwordErr" required>
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
      <Field label="Confirm password" :id="confirmId" :error="confirmErr" required>
        <template #default="{ id, describedby }">
          <Input
            :id="id"
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
            :invalid="Boolean(confirmErr)"
            :aria-describedby="describedby"
          />
        </template>
      </Field>
      <Button type="submit" class="w-full" :disabled="!canSubmit" :loading="isSubmitting">
        {{ isSubmitting ? 'Saving…' : 'Reset password' }}
      </Button>
    </form>

    <SocialAuthSection class="mt-6" />

    <p class="mt-4 text-sm">
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthLogin' }">Back to sign in</RouterLink>
    </p>
  </Card>
</template>
