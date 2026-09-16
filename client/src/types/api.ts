export interface ApiError {
  message: string
  details?: Array<{ field: string; message: string }>
}

export interface Patient {
  id: number
  documentId: string
  firstName: string
  lastName: string
  birthDate: string
  email: string | null
  phone: string | null
}

export interface LabTest {
  id: number
  code: string
  name: string
  description: string | null
  price: number | string
  isActive: boolean
}

export interface OrderStatus {
  code: string
  label: string
}

export interface LabResult {
  id: number
  labOrderId: number
  value: string
  unit: string | null
  referenceRange: string | null
  notes: string | null
  reportedAt: string
}

export interface LabOrder {
  id: number
  patientId: number
  labTestId: number
  statusCode: string
  requestedAt: string
  patient: Patient
  labTest: LabTest
  status: OrderStatus
  result: LabResult | null
}
