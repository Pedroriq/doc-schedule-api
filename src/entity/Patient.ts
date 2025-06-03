import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  name!: string

  @Column('text', { unique: true })
  email!: string

  @Column('text')
  phone!: string

  @Column({ type: 'date' })
  birthdate!: Date

  @CreateDateColumn()
  createdAt!: Date
}
