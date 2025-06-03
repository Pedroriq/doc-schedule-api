import "reflect-metadata"
import { DataSource } from "typeorm"
import { Doctor } from "./entity/Doctor"
import { Patient } from "./entity/Patient"
import { Appointment } from "./entity/Appointment"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "doc-schedule",
    logging: false,
    synchronize: true,
    entities: [Doctor, Patient, Appointment],
    migrations: [],
    subscribers: [],
})
