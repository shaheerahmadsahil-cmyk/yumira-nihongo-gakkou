const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePhone() {
  await prisma.websiteSetting.upsert({
    where: { key: 'whatsapp_number' },
    update: { value: '8801341017323' },
    create: { key: 'whatsapp_number', value: '8801341017323', description: 'Official WhatsApp admission number (international format)' },
  });

  await prisma.websiteSetting.upsert({
    where: { key: 'agency_phone' },
    update: { value: '+880 1341-017323' },
    create: { key: 'agency_phone', value: '+880 1341-017323', description: 'Customer Service Helpline' },
  });

  console.log('Database phone and WhatsApp updated to 01341017323 successfully!');
}

updatePhone()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
