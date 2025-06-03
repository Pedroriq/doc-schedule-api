import * as express from 'express'
import { AppDataSource } from "./data-source"
import { routerAppointment } from "./routes/appointment.routes"
import { routerDoctor } from './routes/doctor.routes'
import { routerPatient } from './routes/patient.routes'


const app = express()
app.use(express.json())

app.use("/appointments", routerAppointment)
app.use("/doctors", routerDoctor)
app.use("/patients", routerPatient)

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000")
        })
    })
    .catch(error => console.log("Erro ao conectar com o banco:", error))
