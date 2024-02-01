import { z } from 'zod'

export const ProfileData = z.object({
  id: z.string(),
  email: z.string(),
  isAdmin: z.boolean(),
  isActivated:z.boolean()
})

export const ProfileState = z.object({
  email: z.string(),
  password: z.string().optional()
})
