import { prisma } from '../lib/prisma.js'

export const patientService = {
  list: () => prisma.patient.findMany({ orderBy: { lastName: 'asc' } }),
  getById: (id: number) => prisma.patient.findUniqueOrThrow({ where: { id } }),
  create: (data: Parameters<typeof prisma.patient.create>[0]['data']) => prisma.patient.create({ data }),
  update: (id: number, data: Parameters<typeof prisma.patient.update>[0]['data']) =>
    prisma.patient.update({ where: { id }, data }),
  remove: (id: number) => prisma.patient.delete({ where: { id } }),
}