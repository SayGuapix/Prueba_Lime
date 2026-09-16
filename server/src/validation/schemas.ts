import { z } from 'zod'

const optionalText = z.string().trim().optional().nullable()

export const idParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const patientFieldsSchema = z.object({
  documentId: z.string().trim().min(1),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  birthDate: z.coerce.date(),
  email: z.string().email().optional().nullable(),
  phone: optionalText,
})

function rejectFutureBirthDate(patient: { birthDate?: Date }, context: z.RefinementCtx) {
  if (patient.birthDate && patient.birthDate > new Date()) {
    context.addIssue({ code: 'custom', path: ['birthDate'], message: 'No puede ser una fecha futura' })
  }
}

export const patientCreateSchema = patientFieldsSchema.superRefine((patient, context) => {
  rejectFutureBirthDate(patient, context)
})

export const patientUpdateSchema = patientFieldsSchema.partial().superRefine((patient, context) => {
  rejectFutureBirthDate(patient, context)
})

export const labTestCreateSchema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
  description: optionalText,
  price: z.coerce.number().finite().nonnegative(),
  isActive: z.boolean().optional(),
})

export const labTestUpdateSchema = labTestCreateSchema.partial()

const orderStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])

export const labOrderCreateSchema = z.object({
  patientId: z.coerce.number().int().positive(),
  labTestId: z.coerce.number().int().positive(),
  statusCode: orderStatusSchema.optional(),
})

export const labOrderUpdateSchema = labOrderCreateSchema.partial()

export const labResultCreateSchema = z.object({
  labOrderId: z.coerce.number().int().positive(),
  value: z.string().trim().min(1),
  unit: optionalText,
  referenceRange: optionalText,
  notes: optionalText,
})

export const labResultUpdateSchema = labResultCreateSchema.omit({ labOrderId: true }).partial()