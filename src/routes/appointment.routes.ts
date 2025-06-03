import { Router } from "express"

export const routerAppointment = Router()

routerAppointment.get('/', (req, res) => {res.send('Serviço pronto')})