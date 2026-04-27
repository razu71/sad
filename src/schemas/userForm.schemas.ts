import { z } from 'zod'

export const userFormSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(100),
  email: z.string().min(1, 'Email is required.').email('Enter a valid email address.'),
  role: z.enum(['admin', 'editor', 'viewer']),
  active: z.boolean(),
})

export type UserFormValues = z.infer<typeof userFormSchema>
