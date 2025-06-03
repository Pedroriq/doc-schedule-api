import { z } from 'zod'

export const createAppointmentSchema = z.object({
  patientId: z.number(),
  doctorId: z.number(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  description: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
})

export const updateAppointmentSchema = z.object({
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .optional(),
  description: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
})

export type CreateAppointmentrDTO = z.infer<typeof createAppointmentSchema>
export type UpdateAppointmentDTO = z.infer<typeof updateAppointmentSchema>
