import type { Request, Response } from 'express'
import { labOrderService } from '../services/lab-order.service.js'
import { idParamsSchema, labOrderCreateSchema, labOrderUpdateSchema } from '../validation/schemas.js'

export async function listLabOrders(_request: Request, response: Response) {
  response.json(await labOrderService.list())
}

export async function getLabOrder(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  response.json(await labOrderService.getById(id))
}

export async function createLabOrder(request: Request, response: Response) {
  const data = labOrderCreateSchema.parse(request.body)
  response.status(201).json(await labOrderService.create(data))
}

export async function updateLabOrder(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  const data = labOrderUpdateSchema.parse(request.body)
  response.json(await labOrderService.update(id, data))
}

export async function deleteLabOrder(request: Request, response: Response) {
  const { id } = idParamsSchema.parse(request.params)
  await labOrderService.remove(id)
  response.status(204).send()
}