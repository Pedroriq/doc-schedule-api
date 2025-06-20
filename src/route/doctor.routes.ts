import { Router } from 'express'
import { AppDataSource } from '../data-source'
import { Doctor } from '../entity/Doctor'
import { checkExistsEmail } from '../middlewares/checkExistsEmail'
import { DoctorController } from '../controller/DoctorController'

export const routerDoctor = Router()

routerDoctor.post(
  '/',
  checkExistsEmail(AppDataSource.getRepository(Doctor)),
  DoctorController.create,
)

routerDoctor.get('/', DoctorController.getAll)
routerDoctor.get('/specialty/:specialty', DoctorController.getSpecialty)
routerDoctor.get('/name/:name', DoctorController.getByName)
routerDoctor.get('/id/:id', DoctorController.getById)

routerDoctor.delete('/:id', DoctorController.deleteDoctor)

routerDoctor.put('/:id', DoctorController.update)
