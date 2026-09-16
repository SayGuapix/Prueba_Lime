import type { Request, Response } from 'express'
import { patientService } from '../services/patient.service.js'
import { idParamsSchema, patientCreateSchema, patientUpdateSchema } from '../validation/schemas.js'

export async function listPatients(_request: Request, response: Response) {
  response.json(await patientService.list())
}

export async function getPatient(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  response.json(await patientService.getById(id))
}

export async function createPatient(request: Request, response: Response) {
  const data = patientCreateSchema.parse(request.body)
  response.status(201).json(await patientService.create(data))
}

export async function updatePatient(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  const data = patientUpdateSchema.parse(request.body)
  response.json(await patientService.update(id, data))
}

export async function deletePatient(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  await patientService.remove(id)
  response.status(204).send()
}