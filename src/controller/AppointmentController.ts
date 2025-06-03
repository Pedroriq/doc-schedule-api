import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Appointment } from '../entity/Appointment'
import { Patient } from '../entity/Patient'
import { Doctor } from '../entity/Doctor'
import { Between } from 'typeorm'
import { createAppointmentSchema } from '../dtos/appointment.dto'
import { updateAppointmentSchema } from '../dtos/appointment.dto'

export class AppointmentController {
  static async create(req: Request, res: Response) {
    const parsed = createAppointmentSchema.safeParse(req.body)

    if (!parsed.success) {
      res.status(400).json({
        message: 'Validation error',
        errors: parsed.error.format(),
      })
      return
    }

    const { patientId, doctorId, date, description, status } = parsed.data

    const appointmentRepo = AppDataSource.getRepository(Appointment)
    const patientRepo = AppDataSource.getRepository(Patient)
    const doctorRepo = AppDataSource.getRepository(Doctor)

    const patient = await patientRepo.findOneBy({ id: patientId })
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' })
      return
    }

    const doctor = await doctorRepo.findOneBy({ id: doctorId })
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' })
      return
    }

    const dateDate = new Date(date)

    const appointment = appointmentRepo.create({
      patient,
      doctor,
      date: dateDate,
      description,
      status: status ?? 'scheduled',
    })

    await appointmentRepo.save(appointment)

    res.status(201).json(appointment)
  }

  static async getAll(req: Request, res: Response) {
    try {
      const repo = AppDataSource.getRepository(Appointment)
      const appointments = await repo.find()
      res.status(200).json(appointments)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to search an appointment' })
    }
  }

  static async getAppointmentByPacientId(req: Request, res: Response) {
    const { patientId } = req.params

    const patientRepo = AppDataSource.getRepository(Patient)
    const patient = await patientRepo.findOneBy({ id: Number(patientId) })

    if (!patient) {
      res.status(404).json({ message: 'Patient not found' })
      return
    }

    try {
      const appointmentRepo = AppDataSource.getRepository(Appointment)
      const appointments = await appointmentRepo.find({
        where: {
          patient: {
            id: Number(patientId),
          },
        },
        relations: ['patient', 'doctor'],
      })

      res.status(200).json(appointments)
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ message: 'Error to search appoitment by patient id' })
    }
  }

  static async getAppointmentByDoctorId(req: Request, res: Response) {
    const { doctorId } = req.params

    const doctorRepo = AppDataSource.getRepository(Doctor)
    const doctor = await doctorRepo.findOneBy({ id: Number(doctorId) })

    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' })
      return
    }

    try {
      const appointmentRepo = AppDataSource.getRepository(Appointment)
      const appointments = await appointmentRepo.find({
        where: {
          doctor: {
            id: Number(doctorId),
          },
        },
        relations: ['patient', 'doctor'],
      })

      res.status(200).json(appointments)
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ message: 'Error to search appoitment by doctor id' })
    }
  }

  static async getTodayAppointment(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Appointment)

    const now = new Date()

    const startOfDay = new Date(now)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(now)
    endOfDay.setHours(23, 59, 59, 999)

    try {
      const todayAppointments = repo.find({
        where: { date: Between(startOfDay, endOfDay) },
        relations: ['patient', 'doctor'],
      })

      res.status(200).json(todayAppointments)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error to search today appointment', error: error })
    }
  }

  static async deleteAppointment(req: Request, res: Response) {
    const { appointmentId } = req.params
    const repo = AppDataSource.getRepository(Appointment)

    try {
      const appointment = await repo.findOneBy({ id: Number(appointmentId) })

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' })
        return
      }

      await repo.remove(appointment)
      res.status(200).json({ message: 'Appointment remove successfuly' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error to delete appointment' })
    }
  }

  static async update(req: Request, res: Response) {
    const { appointmentId } = req.params
    const parseResult = updateAppointmentSchema.safeParse(req.body)

    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.format() })
      return
    }

    const repo = AppDataSource.getRepository(Appointment)
    const appointment = await repo.findOneBy({ id: Number(appointmentId) })

    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' })
      return
    }

    repo.merge(appointment, parseResult.data)
    await repo.save(appointment)

    res.json(appointment)
  }
}
