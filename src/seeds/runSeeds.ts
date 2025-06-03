import { AppDataSource } from '../data-source'
import { seedDoctors } from './createDoctor'
import { seedPatients } from './createPatient'
import { seedAppointments } from './createAppointment'

async function runSeeds() {
  try {
    await AppDataSource.initialize()

    await seedDoctors()
    await seedPatients()
    await seedAppointments()

    console.log('All seeds executed successfully')
    await AppDataSource.destroy()
  } catch (error) {
    console.error('Error running seeds:', error)
    process.exit(1)
  }
}

runSeeds()
