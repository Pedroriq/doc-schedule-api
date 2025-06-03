import * as express from 'express'
import { AppDataSource } from './data-source'
import { routerAppointment } from './route/appointment.routes'
import { routerDoctor } from './route/doctor.routes'
import { routerPatient } from './route/patient.routes'

const app = express()
app.use(express.json())

app.use('/appointments', routerAppointment)
app.use('/doctors', routerDoctor)
app.use('/patients', routerPatient)

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running in http://localhost:3000')
    })
  })
  .catch((error) => console.log('Error to connect database:', error))
