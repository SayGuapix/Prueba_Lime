import { prisma } from '../lib/prisma.js'

const orderInclude = {
  patient: true,
  labTest: true,
  status: true,
  result: true,
} as const

export const labOrderService = {
  list: () => prisma.labOrder.findMany({ include: orderInclude, orderBy: { requestedAt: 'desc' } }),
  getById: (id: number) => prisma.labOrder.findUniqueOrThrow({ where: { id }, include: orderInclude }),
  create: (data: Parameters<typeof prisma.labOrder.create>[0]['data']) =>
    prisma.labOrder.create({ data, include: orderInclude }),
  update: (id: number, data: Parameters<typeof prisma.labOrder.update>[0]['data']) =>
    prisma.labOrder.update({ where: { id }, data, include: orderInclude }),
  remove: (id: number) => prisma.labOrder.delete({ where: { id } }),
}