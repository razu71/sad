<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { computed, ref, unref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from '@/components/ui/Toast'
import Alert from '@/components/ui/Alert.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Field from '@/components/ui/Field.vue'
import Input from '@/components/ui/Input.vue'
import { fieldErrorDisplay } from '@/lib/form/fieldErrorDisplay'
import { focusFirstErrorField } from '@/lib/form/focusFirstErrorField'
import { useAuthStore } from '@/stores/auth'
import { forgotPasswordSchema } from '@/schemas/auth.schemas'
import SocialAuthSection from '@/components/app/SocialAuthSection.vue'

const auth = useAuthStore()
const toast = useToast()

const emailId = 'forgot-email'

const { handleSubmit, submitCount, meta: formMeta, isSubmitting } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: { email: '' },
  validateOnMount: false,
})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField<string>('email')
const emailErr = computed(() => fieldErrorDisplay(unref(emailError), emailMeta, submitCount))
const canSubmit = computed(() => formMeta.value.valid)

const done = ref(false)
const serverError = ref<string | null>(null)

const submitForm = handleSubmit(
  async (values) => {
    serverError.value = null

    try {
      await auth.forgotPassword(values.email.trim())
      done.value = true
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      serverError.value = msg
      toast.error(msg)
    }
  },
  (ctx) => {
    focusFirstErrorField([{ path: 'email', id: emailId }], ctx.errors)
  },
)
</script>

<template>
  <Card>
    <h1 class="text-lg font-semibold text-[var(--foreground)]">Forgot password</h1>
    <p class="mt-1 text-sm text-[var(--muted-foreground)]">Mock flow: no email is sent. Submit to continue.</p>

    <Alert v-if="serverError" variant="destructive" class="mt-4" :title="serverError" />
    <Alert v-else-if="done" variant="success" class="mt-4" title="Check your email for reset instructions (mock — no message is sent)." />

    <form class="mt-4 space-y-4" @submit.prevent="submitForm">
      <Field label="Email" :id="emailId" :error="emailErr" required>
        <template #default="{ id, describedby }">
          <Input
            :id="id"
            v-model="email"
            type="email"
            autocomplete="email"
            :disabled="done"
            :invalid="Boolean(emailErr)"
            :aria-describedby="describedby"
          />
        </template>
      </Field>
      <Button type="submit" class="w-full" :disabled="!canSubmit || done" :loading="isSubmitting">
        {{ isSubmitting ? 'Sending…' : 'Send reset link' }}
      </Button>
    </form>

    <SocialAuthSection class="mt-6" />

    <p class="mt-4 text-sm">
      <RouterLink class="text-[var(--secondary)] hover:underline" :to="{ name: 'AuthLogin' }">Back to sign in</RouterLink>
    </p>
  </Card>
</template>
