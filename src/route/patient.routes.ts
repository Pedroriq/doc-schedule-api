import { Router } from 'express'
import { checkExistsEmail } from '../middlewares/checkExistsEmail'
import { AppDataSource } from '../data-source'
import { Patient } from '../entity/Patient'
import { PatientController } from '../controller/PatientController'

export const routerPatient = Router()

routerPatient.post(
  '/',
  checkExistsEmail(AppDataSource.getRepository(Patient)),
  PatientController.create,
)

routerPatient.get('/', PatientController.getAll)
routerPatient.get('/name/:name', PatientController.getByName)
routerPatient.get('/id/:id', PatientController.getById)

routerPatient.delete('/:id', PatientController.deletePatient)

routerPatient.put('/:id', PatientController.update)
