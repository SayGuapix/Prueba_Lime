import { Router } from 'express'
import {
  createLabOrder,
  deleteLabOrder,
  getLabOrder,
  listLabOrders,
  updateLabOrder,
} from '../controllers/lab-order.controller.js'
import { createOrderResult, getOrderResult } from '../controllers/lab-result.controller.js'

export const labOrderRouter = Router()

labOrderRouter.get('/', listLabOrders)
labOrderRouter.get('/:id', getLabOrder)
labOrderRouter.post('/', createLabOrder)
labOrderRouter.patch('/:id', updateLabOrder)
labOrderRouter.delete('/:id', deleteLabOrder)
labOrderRouter.get('/:id/result', getOrderResult)
labOrderRouter.post('/:id/result', createOrderResult)