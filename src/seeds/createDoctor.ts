import { AppDataSource } from '../data-source'
import { Doctor } from '../entity/Doctor'
import { DeepPartial } from 'typeorm'

export async function seedDoctors() {
  const repo = AppDataSource.getRepository(Doctor)
  const doctors: DeepPartial<Doctor>[] = [
    {
      name: 'Dr. João Silva',
      email: 'joao.silva@example.com',
      phone: '11999990001',
      specialty: 'Cardiologia',
    },
    {
      name: 'Dra. Maria Oliveira',
      email: 'maria.oliveira@example.com',
      phone: '11999990002',
      specialty: 'Dermatologia',
    },
    {
      name: 'Dr. Carlos Santos',
      email: 'carlos.santos@example.com',
      phone: '11999990003',
      specialty: 'Neurologia',
    },
    {
      name: 'Dra. Ana Lima',
      email: 'ana.lima@example.com',
      phone: '11999990004',
      specialty: 'Pediatria',
    },
    {
      name: 'Dr. Rafael Costa',
      email: 'rafael.costa@example.com',
      phone: '11999990005',
      specialty: 'Ortopedia',
    },
  ]

  const createdDoctors = repo.create(doctors)
  await repo.save(createdDoctors)
}
