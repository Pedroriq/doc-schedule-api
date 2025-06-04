# DOC Schedule API
[![Doc API CI](https://github.com/Pedroriq/doc-schedule-api/actions/workflows/main.yml/badge.svg)](https://github.com/Pedroriq/doc-schedule-api/actions/workflows/main.yml)

## Introduction
A project to register patients and schedule appointments with doctors.

This project is deployed in Render and can be acessed with https://doc-schedule-api.onrender.com

You can create, list, update and delete Patients, Doctors or Appointments.

## How to use
If you want to run in you local machine, execute docker command:

```
docker-compose up --build -d
```

## Routes
### Patients
#### View or create patient 
`/patients - [GET, POST]`

#### Get patient by name
`/patients/:name - [GET]`

#### Delete or update patient by id
`/patients/:id - [DELETE, PUT]`

### Doctors
#### View or create doctor
`/doctors - [GET, POST]`

#### Search doctors by specialty
`/doctors/specialy/:specialty - [GET]`

#### Get doctor by name
`/doctors/:name - [GET]`

#### Delete or update doctor by id
`/doctors/:id - [DELETE, PUT]`

### Appointments
#### View or create an appointment
`/appointments - [GET, POST]`

#### Search appointment by patient id
`/appointments/patient/:patientId - [GET]`

#### Search appointment by doctor id
`/appointments/doctor/:doctorId - [GET]`

#### Delete or update and appointment by id
`/appointments/:appointmentId - [DELETE, PUT]`