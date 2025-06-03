import { z } from 'zod'

export const createPatientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
})

export const updatePatientSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  birthdate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .optional(),
})

export type CreatePatientrDTO = z.infer<typeof createPatientSchema>
export type UpdatePatientDTO = z.infer<typeof updatePatientSchema>
