import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const statuses = [
    { code: 'new', title: 'New', description: 'Lead is created', isTerminal: false },
    { code: 'in_progress', title: 'In Progress', description: 'Lead is being processed', isTerminal: false },
    { code: 'won', title: 'Won', description: 'Lead converted successfully', isTerminal: true },
    { code: 'lost', title: 'Lost', description: 'Lead processing completed with no conversion', isTerminal: true }
  ];

  for (const status of statuses) {
    await prisma.statusDictionary.upsert({
      where: { code: status.code },
      update: {
        title: status.title,
        description: status.description,
        isTerminal: status.isTerminal
      },
      create: status
    });
  }

  const statusByCode = Object.fromEntries(
    (await prisma.statusDictionary.findMany({ select: { id: true, code: true } })).map((status) => [status.code, status.id])
  );

  const labelMappings = [
    { externalLabel: 'new_lead', internalStatusId: statusByCode.new },
    { externalLabel: 'work', internalStatusId: statusByCode.in_progress },
    { externalLabel: 'converted', internalStatusId: statusByCode.won },
    { externalLabel: 'rejected', internalStatusId: statusByCode.lost }
  ];

  for (const mapping of labelMappings) {
    await prisma.labelMapping.upsert({
      where: {
        externalLabel_internalStatusId: {
          externalLabel: mapping.externalLabel,
          internalStatusId: mapping.internalStatusId
        }
      },
      update: {},
      create: mapping
    });
  }

  await prisma.adminUser.upsert({
    where: { email: 'admin@example.com' },
    update: {
      fullName: 'Default Administrator',
      role: 'superadmin',
      isActive: true
    },
    create: {
      email: 'admin@example.com',
      fullName: 'Default Administrator',
      role: 'superadmin',
      passwordHash: '$2b$12$placeholderChangeMeImmediately',
      isActive: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
