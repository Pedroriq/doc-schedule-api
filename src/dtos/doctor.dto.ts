import { z } from 'zod'

export const createDoctorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  specialty: z.string(),
})

export const updateDoctorSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  specialty: z.string(),
})

export type CreateDoctorDTO = z.infer<typeof createDoctorSchema>
export type UpdateDoctorDTO = z.infer<typeof updateDoctorSchema>
