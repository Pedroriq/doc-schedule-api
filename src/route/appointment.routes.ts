import { Router } from "express"
import { AppointmentController } from "../controller/AppointmentController"

export const routerAppointment = Router()

routerAppointment.post('/', 
    AppointmentController.create
)

routerAppointment.get('/',
    AppointmentController.getAll
)

routerAppointment.get('/patient/:patientId', 
    AppointmentController.getAppointmentByPacientId
)

routerAppointment.get('/doctor/:doctorId', 
    AppointmentController.getAppointmentByDoctorId
)

routerAppointment.get('/today',
    AppointmentController.getTodayAppointment
)

routerAppointment.delete('/:appointmentId', 
    AppointmentController.deleteAppointment
)

routerAppointment.put('/:appointmentId',
    AppointmentController.update
)