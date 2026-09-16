import type { Request, Response } from 'express'
import { labTestService } from '../services/lab-test.service.js'
import { idParamsSchema, labTestCreateSchema, labTestUpdateSchema } from '../validation/schemas.js'

export async function listLabTests(_request: Request, response: Response) {
  response.json(await labTestService.list())
}

export async function getLabTest(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  response.json(await labTestService.getById(id))
}

export async function createLabTest(request: Request, response: Response) {
  const data = labTestCreateSchema.parse(request.body)
  response.status(201).json(await labTestService.create(data))
}

export async function updateLabTest(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  const data = labTestUpdateSchema.parse(request.body)
  response.json(await labTestService.update(id, data))
}

export async function deleteLabTest(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  await labTestService.remove(id)
  response.status(204).send()
}