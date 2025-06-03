import "reflect-metadata"
import { DataSource } from "typeorm"
import { Doctor } from "./entity/Doctor"
import { Patient } from "./entity/Patient"
import { Appointment } from "./entity/Appointment"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "doc-schedule",
    logging: false,
    entities: [Doctor, Patient, Appointment],
    migrations: [],
    subscribers: [],
})
