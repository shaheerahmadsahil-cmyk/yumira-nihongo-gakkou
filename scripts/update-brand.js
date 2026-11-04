const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateSettings() {
  await prisma.websiteSetting.upsert({
    where: { key: 'agency_name' },
    update: { value: 'Yumira Nihongo Gakkou' },
    create: { key: 'agency_name', value: 'Yumira Nihongo Gakkou', description: 'Official Academy Name' },
  });

  await prisma.websiteSetting.upsert({
    where: { key: 'agency_tagline' },
    update: { value: 'স্বপ্ন ও ভবিষ্যৎ — Dream • Grow • Achieve • A Future Without Limits' },
    create: { key: 'agency_tagline', value: 'স্বপ্ন ও ভবিষ্যৎ — Dream • Grow • Achieve • A Future Without Limits', description: 'Agency Tagline' },
  });

  await prisma.websiteSetting.upsert({
    where: { key: 'agency_logo' },
    update: { value: '/images/yumira-logo.jpg' },
    create: { key: 'agency_logo', value: '/images/yumira-logo.jpg', description: 'Official Logo Path' },
  });

  await prisma.websiteSetting.upsert({
    where: { key: 'agency_email' },
    update: { value: 'admissions@yumira.com' },
    create: { key: 'agency_email', value: 'admissions@yumira.com' },
  });

  console.log('Database brand updated to Yumira Nihongo Gakkou successfully!');
}

updateSettings()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
