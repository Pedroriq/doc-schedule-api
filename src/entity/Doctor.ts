import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  name!: string

  @Column('text', { unique: true })
  email!: string

  @Column('text')
  phone!: string

  @Column('text')
  specialty!: string

  @CreateDateColumn()
  createdAt!: Date
}
