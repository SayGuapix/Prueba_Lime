import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js'
import { healthRouter } from './routes/health.routes.js'
import { labOrderRouter } from './routes/lab-order.routes.js'
import { labResultRouter } from './routes/lab-result.routes.js'
import { labTestRouter } from './routes/lab-test.routes.js'
import { patientRouter } from './routes/patient.routes.js'

export const app = express()

app.use(cors({ origin: env.CORS_ORIGIN }))
app.use(express.json())
app.use('/api/health', healthRouter)
app.use('/api/patients', patientRouter)
app.use('/api/tests', labTestRouter)
app.use('/api/orders', labOrderRouter)
app.use('/api/results', labResultRouter)
app.use(notFoundHandler)
app.use(errorHandler)
