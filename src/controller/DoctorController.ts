import { AppDataSource } from '../data-source'
import { Doctor } from '../entity/Doctor'
import { Request, Response } from 'express'
import { createDoctorSchema } from '../dtos/doctor.dto'
import { updateDoctorSchema } from '../dtos/doctor.dto'

export class DoctorController {
  static async create(req: Request, res: Response) {
    const parsed = createDoctorSchema.safeParse(req.body)

    if (!parsed.success) {
      res.status(400).json({
        message: 'Validation error',
        errors: parsed.error.format(),
      })
      return
    }

    const { name, email, phone, specialty } = req.body
    const repo = AppDataSource.getRepository(Doctor)

    const doctor = repo.create({ name, email, phone, specialty })
    await repo.save(doctor)

    res.status(201).json(doctor)
  }

  static async getAll(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Doctor)
      const doctors = await repo.find()

      res.status(200).json(doctors)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to search doctors' })
    }
  }

  static async getSpecialty(req: Request, res: Response) {
    const { specialty } = req.params

    try {
      const repo = AppDataSource.getRepository(Doctor)
      const doctors = await repo.find({ where: { specialty } })

      res.status(200).json(doctors)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to search specialty doctors' })
    }
  }

  static async getByName(req: Request, res: Response) {
    const { name } = req.params

    try {
      const repo = AppDataSource.getRepository(Doctor)
      const doctors = await repo.find({ where: { name } })

      res.status(200).json(doctors)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to search doctor by name' })
    }
  }

  static async deleteDoctor(req: Request, res: Response) {
    const { id } = req.params
    const repo = AppDataSource.getRepository(Doctor)

    try {
      const doctor = await repo.findOneBy({ id: Number(id) })

      if (!doctor) {
        res.status(404).json({ message: 'Doctor not found' })
        return
      }

      await repo.remove(doctor)
      res.status(200).json({ message: 'Doctor removed successfuly' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to delete doctor' })
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    const parseResult = updateDoctorSchema.safeParse(req.body)

    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.format() })
      return
    }

    const repo = AppDataSource.getRepository(Doctor)
    const doctor = await repo.findOneBy({ id: Number(id) })

    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' })
      return
    }

    repo.merge(doctor, parseResult.data)
    await repo.save(doctor)

    res.json(doctor)
  }
}
