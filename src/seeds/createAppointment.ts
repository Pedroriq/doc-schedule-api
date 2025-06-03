import { AppDataSource } from '../data-source'
import { Appointment } from '../entity/Appointment'
import { Patient } from '../entity/Patient'
import { Doctor } from '../entity/Doctor'
import { DeepPartial } from 'typeorm'

export async function seedAppointments() {
  const appointmentRepo = AppDataSource.getRepository(Appointment)
  const patientRepo = AppDataSource.getRepository(Patient)
  const doctorRepo = AppDataSource.getRepository(Doctor)

  const patients = await patientRepo.find()
  const doctors = await doctorRepo.find()

  if (patients.length === 0 || doctors.length === 0) {
    return
  }

  const appointments: DeepPartial<Appointment>[] = [
    {
      date: new Date(Date.now()),
      description: 'Consulta de rotina',
      status: 'scheduled' as const,
      patient: patients[0],
      doctor: doctors[0],
    },
    {
      date: new Date(Date.now() + 86400000), // amanhã
      description: 'Avaliação de dor no peito',
      status: 'scheduled' as const,
      patient: patients[1],
      doctor: doctors[1],
    },
    {
      date: new Date(Date.now() + 2 * 86400000),
      description: 'Consulta de retorno',
      status: 'completed' as const,
      patient: patients[2],
      doctor: doctors[2],
    },
    {
      date: new Date(Date.now() + 3 * 86400000),
      description: 'Cancelada pelo paciente',
      status: 'cancelled' as const,
      patient: patients[3],
      doctor: doctors[3],
    },
    {
      date: new Date(Date.now() + 4 * 86400000),
      description: 'Exame de rotina',
      status: 'scheduled' as const,
      patient: patients[4],
      doctor: doctors[4],
    },
  ]

  const createdAppointments = appointmentRepo.create(appointments)
  await appointmentRepo.save(createdAppointments)
}
