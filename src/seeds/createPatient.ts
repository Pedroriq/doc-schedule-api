import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { DeepPartial } from "typeorm";

export async function seedPatients() {

    const repo = AppDataSource.getRepository(Patient)
      const patients: DeepPartial<Patient>[] = [
    {
      name: 'Lucas Pereira',
      email: 'lucas.pereira@example.com',
      phone: '11998887771',
      birthdate: new Date('1990-03-15'),
    },
    {
      name: 'Juliana Souza',
      email: 'juliana.souza@example.com',
      phone: '11998887772',
      birthdate: new Date('1985-07-22'),
    },
    {
      name: 'Fernanda Lima',
      email: 'fernanda.lima@example.com',
      phone: '11998887773',
      birthdate: new Date('1992-01-10'),
    },
    {
      name: 'Bruno Silva',
      email: 'bruno.silva@example.com',
      phone: '11998887774',
      birthdate: new Date('1988-11-30'),
    },
    {
      name: 'Carla Mendes',
      email: 'carla.mendes@example.com',
      phone: '11998887775',
      birthdate: new Date('1995-09-05'),
    },
  ];

const createdPatients = repo.create(patients);
await repo.save(createdPatients);

}