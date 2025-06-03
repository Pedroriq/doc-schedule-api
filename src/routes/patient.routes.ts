import { Router } from "express"

export const routerPatient = Router()

routerPatient.get('/', (req, res) => {res.send('Serviço pronto')})