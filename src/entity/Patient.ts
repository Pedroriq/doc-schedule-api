import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({unique: true})
  email!: string

  @Column()
  phone!: string

  @Column({type: 'date'})
  birthdate!: Date

  @CreateDateColumn()
  createdAt!: Date
}
