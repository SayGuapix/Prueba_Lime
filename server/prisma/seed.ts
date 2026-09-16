import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (const status of [
    { code: 'PENDING', label: 'Pendiente' },
    { code: 'IN_PROGRESS', label: 'En proceso' },
    { code: 'COMPLETED', label: 'Completada' },
    { code: 'CANCELLED', label: 'Cancelada' },
  ]) {
    await prisma.orderStatus.upsert({
      where: { code: status.code },
      update: { label: status.label },
      create: status,
    })
  }

  const patient = await prisma.patient.upsert({
    where: { documentId: 'DOC-1001' },
    update: {},
    create: {
      documentId: 'DOC-1001',
      firstName: 'Ana',
      lastName: 'Gomez',
      birthDate: new Date('1990-04-12T00:00:00.000Z'),
      email: 'ana.gomez@example.com',
      phone: '+57 300 000 0000',
    },
  })

  const bloodTest = await prisma.labTest.upsert({
    where: { code: 'HEM-001' },
    update: {},
    create: {
      code: 'HEM-001',
      name: 'Hemograma completo',
      description: 'Analisis general de celulas sanguineas',
      price: 25,
    },
  })

  await prisma.labTest.upsert({
    where: { code: 'GLU-001' },
    update: {},
    create: {
      code: 'GLU-001',
      name: 'Glucosa en sangre',
      price: 12,
    },
  })

  const order = await prisma.labOrder.findFirst({
    where: { patientId: patient.id, labTestId: bloodTest.id },
  })

  const seededOrder = order ?? await prisma.labOrder.create({
    data: {
      patientId: patient.id,
      labTestId: bloodTest.id,
      statusCode: 'COMPLETED',
    },
  })

  await prisma.labResult.upsert({
    where: { labOrderId: seededOrder.id },
    update: {
      value: 'Normal',
      notes: 'Resultado de demostracion',
    },
    create: {
      labOrderId: seededOrder.id,
      value: 'Normal',
      notes: 'Resultado de demostracion',
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })