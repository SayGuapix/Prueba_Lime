import type { ErrorRequestHandler, RequestHandler } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).json({ message: 'Ruta no encontrada' })
}

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: 'Los datos enviados no son validos',
      details: error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
      })),
    })
    return
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      response.status(409).json({ message: 'Ya existe un registro con ese valor unico' })
      return
    }

    if (error.code === 'P2003') {
      response.status(409).json({ message: 'El registro tiene relaciones que impiden la operacion' })
      return
    }

    if (error.code === 'P2025') {
      response.status(404).json({ message: 'Registro no encontrado' })
      return
    }
  }

  console.error(error)
  response.status(500).json({ message: 'Error interno del servidor' })
}