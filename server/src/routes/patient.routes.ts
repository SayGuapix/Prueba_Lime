import { Router } from 'express'
import {
  createPatient,
  deletePatient,
  getPatient,
  listPatients,
  updatePatient,
} from '../controllers/patient.controller.js'

export const patientRouter = Router()

patientRouter.get('/', listPatients)
patientRouter.get('/:id', getPatient)
patientRouter.post('/', createPatient)
patientRouter.patch('/:id', updatePatient)
patientRouter.delete('/:id', deletePatient)