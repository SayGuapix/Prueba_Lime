import type { Request, Response } from 'express'
import { labResultService } from '../services/lab-result.service.js'
import { idParamsSchema, labResultCreateSchema, labResultUpdateSchema } from '../validation/schemas.js'

export async function listLabResults(_request: Request, response: Response) {
  response.json(await labResultService.list())
}

export async function getLabResult(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  response.json(await labResultService.getById(id))
}

export async function getOrderResult(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  response.json(await labResultService.getByOrderId(id))
}

export async function createLabResult(request: Request, response: Response) {
  const data = labResultCreateSchema.parse(request.body)
  response.status(201).json(await labResultService.create(data))
}

export async function createOrderResult(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  const data = labResultCreateSchema.omit({ labOrderId: true }).parse(request.body)
  response.status(201).json(await labResultService.create({ ...data, labOrderId: id }))
}

export async function updateLabResult(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  const data = labResultUpdateSchema.parse(request.body)
  response.json(await labResultService.update(id, data))
}

export async function deleteLabResult(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  await labResultService.remove(id)
  response.status(204).send()
}