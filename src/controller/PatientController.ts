import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient";
import { z } from 'zod'


export class PatientController {
    static async create(req: Request, res: Response) {
        const patientSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            phone: z.string(),
            birthdate: z.string().refine(val => !isNaN(Date.parse(val)), {
                message: "Invalid date format",
            }),
        })

        const parsed = patientSchema.safeParse(req.body)

        if(!parsed.success){
            res.status(400).json({
                message: "Validation error",
                errors: parsed.error.format(),
            })
        }


        const { name, email, phone, birthdate } = req.body
        const repo = AppDataSource.getRepository(Patient)

        const patient = repo.create({ name, email, phone, birthdate })
        await repo.save(patient)

        res.status(201).json()
    }
}