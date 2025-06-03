import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Patient } from './Patient'
import { Doctor } from './Doctor'

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor!: Doctor

  @Column({ type: 'timestamp' })
  date!: Date

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column('text', { default: 'scheduled' })
  status!: 'scheduled' | 'completed' | 'cancelled'
}
