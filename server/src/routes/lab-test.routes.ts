import { Router } from 'express'
import {
  createLabTest,
  deleteLabTest,
  getLabTest,
  listLabTests,
  updateLabTest,
} from '../controllers/lab-test.controller.js'

export const labTestRouter = Router()

labTestRouter.get('/', listLabTests)
labTestRouter.get('/:id', getLabTest)
labTestRouter.post('/', createLabTest)
labTestRouter.patch('/:id', updateLabTest)
labTestRouter.delete('/:id', deleteLabTest)