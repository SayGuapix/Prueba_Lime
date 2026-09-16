import { prisma } from '../lib/prisma.js'

export const labTestService = {
  list: () => prisma.labTest.findMany({ orderBy: { name: 'asc' } }),
  getById: (id: number) => prisma.labTest.findUniqueOrThrow({ where: { id } }),
  create: (data: Parameters<typeof prisma.labTest.create>[0]['data']) => prisma.labTest.create({ data }),
  update: (id: number, data: Parameters<typeof prisma.labTest.update>[0]['data']) =>
    prisma.labTest.update({ where: { id }, data }),
  remove: (id: number) => prisma.labTest.delete({ where: { id } }),
}