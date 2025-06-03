import { Router } from "express"
import { AppDataSource } from "../data-source"
import { Doctor } from "../entity/Doctor"

export const routerDoctor = Router()
const repo = AppDataSource.getRepository(Doctor)

routerDoctor.post('/', async (req, res) => {
    const doctor = repo.create(req.body)
    await repo.save(doctor)

    res.status(201).json(doctor)
})

