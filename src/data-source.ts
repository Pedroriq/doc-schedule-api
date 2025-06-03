import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Doctor } from './entity/Doctor'
import { Patient } from './entity/Patient'
import { Appointment } from './entity/Appointment'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'doc-schedule',
  logging: false,
  synchronize: false,
  entities: [Doctor, Patient, Appointment],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
})
