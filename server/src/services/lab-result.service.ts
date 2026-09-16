import { prisma } from '../lib/prisma.js'

export const labResultService = {
  list: () => prisma.labResult.findMany({ orderBy: { reportedAt: 'desc' } }),
  getById: (id: number) => prisma.labResult.findUniqueOrThrow({ where: { id } }),
  getByOrderId: (labOrderId: number) => prisma.labResult.findUniqueOrThrow({ where: { labOrderId } }),
  create: (data: Parameters<typeof prisma.labResult.create>[0]['data']) => prisma.labResult.create({ data }),
  update: (id: number, data: Parameters<typeof prisma.labResult.update>[0]['data']) =>
    prisma.labResult.update({ where: { id }, data }),
  remove: (id: number) => prisma.labResult.delete({ where: { id } }),
}