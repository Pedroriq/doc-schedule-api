import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Doctor } from './entity/Doctor'
import { Patient } from './entity/Patient'
import { Appointment } from './entity/Appointment'
import { env } from './env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: false,
  synchronize: false,
  entities: [Doctor, Patient, Appointment],
  migrations: ['src/migration/*.ts'],
  subscribers: [],
})
