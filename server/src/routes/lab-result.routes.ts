import { Router } from 'express'
import {
  createLabResult,
  deleteLabResult,
  getLabResult,
  listLabResults,
  updateLabResult,
} from '../controllers/lab-result.controller.js'

export const labResultRouter = Router()

labResultRouter.get('/', listLabResults)
labResultRouter.get('/:id', getLabResult)
labResultRouter.post('/', createLabResult)
labResultRouter.patch('/:id', updateLabResult)
labResultRouter.delete('/:id', deleteLabResult)