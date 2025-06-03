import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({unique: true})
  email!: string

  @Column()
  phone!: string

  @Column()
  specialty!: string

  @CreateDateColumn()
  createdAt!: Date
}
