import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Patient } from '../entity/Patient'
import { z } from 'zod'

export class PatientController {
  static async create(req: Request, res: Response) {
    const patientSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      }),
    })

    const parsed = patientSchema.safeParse(req.body)

    if (!parsed.success) {
      res.status(400).json({
        message: 'Validation error',
        errors: parsed.error.format(),
      })
    }

    const { name, email, phone, birthdate } = req.body
    const repo = AppDataSource.getRepository(Patient)

    const patient = repo.create({ name, email, phone, birthdate })
    await repo.save(patient)

    res.status(201).json()
  }

  static async getAll(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Patient)
      const patients = await repo.find()

      res.status(200).json(patients)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to search patient' })
    }
  }

  static async getByName(req: Request, res: Response) {
    const { name } = req.params

    try {
      const repo = AppDataSource.getRepository(Patient)
      const patients = await repo.find({ where: { name } })

      res.status(200).json(patients)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to search patient by name' })
    }
  }

  static async deletePatient(req: Request, res: Response) {
    const { id } = req.params
    const repo = AppDataSource.getRepository(Patient)

    try {
      const patient = await repo.findOneBy({ id: Number(id) })

      if (!patient) {
        res.status(404).json({ message: 'Patient not found' })
        return
      }

      await repo.remove(patient)
      res.status(200).json({ message: 'Petient removed successfuly' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to delete patient' })
    }
  }

  static async update(req: Request, res: Response) {
    const patientSchema = z.object({
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

    const { id } = req.params
    const parseResult = patientSchema.safeParse(req.body)

    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.format() })
      return
    }

    const repo = AppDataSource.getRepository(Patient)
    const patient = await repo.findOneBy({ id: Number(id) })

    if (!patient) {
      res.status(404).json({ message: 'Patient not found' })
    }

    repo.merge(patient, parseResult.data)
    await repo.save(patient)

    res.json(patient)
  }
}
