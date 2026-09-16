import type { LabOrder, LabResult, LabTest, Patient } from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.message ?? 'No se pudo completar la operación')
  }

  return payload as T
}

const json = (method: string, body: unknown): RequestInit => ({
  method,
  body: JSON.stringify(body),
})

export const api = {
  patients: {
    list: () => request<Patient[]>('/patients'),
    create: (body: unknown) => request<Patient>('/patients', json('POST', body)),
    update: (id: number, body: unknown) => request<Patient>(`/patients/${id}`, json('PATCH', body)),
    remove: (id: number) => request<void>(`/patients/${id}`, { method: 'DELETE' }),
  },
  tests: {
    list: () => request<LabTest[]>('/tests'),
    create: (body: unknown) => request<LabTest>('/tests', json('POST', body)),
    update: (id: number, body: unknown) => request<LabTest>(`/tests/${id}`, json('PATCH', body)),
    remove: (id: number) => request<void>(`/tests/${id}`, { method: 'DELETE' }),
  },
  orders: {
    list: () => request<LabOrder[]>('/orders'),
    create: (body: unknown) => request<LabOrder>('/orders', json('POST', body)),
    update: (id: number, body: unknown) => request<LabOrder>(`/orders/${id}`, json('PATCH', body)),
    remove: (id: number) => request<void>(`/orders/${id}`, { method: 'DELETE' }),
  },
  results: {
    list: () => request<LabResult[]>('/results'),
    create: (body: unknown) => request<LabResult>('/results', json('POST', body)),
    update: (id: number, body: unknown) => request<LabResult>(`/results/${id}`, json('PATCH', body)),
    remove: (id: number) => request<void>(`/results/${id}`, { method: 'DELETE' }),
  },
}

export async function getHealth(): Promise<{ status: string }> {
  return request<{ status: string }>('/health')
}
