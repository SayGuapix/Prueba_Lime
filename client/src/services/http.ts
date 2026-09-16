const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function getHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`)

  if (!response.ok) {
    throw new Error('No se pudo conectar con el servidor')
  }

  return response.json() as Promise<{ status: string }>
}
