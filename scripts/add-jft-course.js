const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addJft() {
  console.log('Adding JFT-Basic course to Neon PostgreSQL...');

  const jftData = {
    slug: 'jft-basic',
    level: 'JFT-A2',
    baseFee: 10000,
    currency: 'BDT',
    duration: '4 Months',
    schedule: '3 Days / Week (Online & Offline)',
    badge: 'SSW Working Visa Special',
    featured: true,
    published: true,
    translations: [
      {
        locale: 'bn',
        title: 'JFT-Basic (A2) স্পেশাল কোর্স — SSW ওয়ার্কিং ভিসা',
        subtitle: 'জাপান স্পেসিফাইড স্কিল্ড ওয়ার্কার (SSW / 特定技能) ভিসার জন্য শতভাগ প্রস্তুতি',
        description: 'জাপানে সরাসরি ওয়ার্ক পারমিট (জব) নিয়ে যাওয়ার জন্য JFT-Basic A2 কম্পিউটার টেস্ট (CBT) প্রস্তুতি ও ইন্টারভিউ কোচিং।',
        features: JSON.stringify(['ইরোদোরি (Irodori) কারিকুলাম ও অডিও লিসেনিং', 'CBT কম্পিউটার-বেসড টেস্ট সিমুলেশন', 'কাজের পরিবেশের বাস্তব কথোপকথন', 'SSW স্কিল টেস্ট ও সিভি/ইন্টারভিউ প্রস্তুতি']),
        curriculum: JSON.stringify([
          { module: 'Module 1', hours: '35h', topics: ['Irodori Starter & Elementary A2-1', 'কাজের স্থানের প্রাথমিক জাপানি', 'CBT প্রশ্ন টাইপ পরিচিতি'] },
          { module: 'Module 2', hours: '45h', topics: ['Irodori Elementary A2-2', 'বাস্তব কর্মক্ষেত্র লিসেনিং', 'SSW ইন্টারভিউ ও স্কিল এক্সাম গাইডেন্স'] },
        ]),
        faq: JSON.stringify([
          { q: 'JFT-Basic এবং JLPT-এর পার্থক্য কী?', a: 'JLPT বছরে ২ বার খাতা-কলমে হয়, কিন্তু JFT-Basic বছরে বহুবার কম্পিউটারে (CBT) দেওয়া যায় এবং SSW ওয়ার্কিং ভিসার জন্য এটি সরাসরি গ্রহণযোগ্য।' },
          { q: 'এই কোর্স করলে কি জব পাওয়া সহজ হবে?', a: 'হ্যাঁ, আমরা ভাষা শিক্ষার পাশাপাশি জাপানের বিভিন্ন সেক্টরে (কেয়ারগিভার, এগ্রিকালচার, ফুড সার্ভিস ইত্যাদি) ইন্টারভিউ কোচিং প্রদান করি।' },
        ]),
      },
      {
        locale: 'en',
        title: 'JFT-Basic (A2) Special Course — SSW Working Visa',
        subtitle: 'Complete preparation for Japan Specified Skilled Worker (SSW) Visa',
        description: 'Official computer-based test (CBT) training and practical workplace Japanese for Japan work visas.',
        features: JSON.stringify(['Irodori Curriculum Mastery', 'CBT Test Simulations', 'Workplace Communication', 'SSW Skills & Interview Coaching']),
        curriculum: JSON.stringify([]),
        faq: JSON.stringify([]),
      },
      {
        locale: 'ja',
        title: 'JFT-Basic（A2）特定技能就労ビザ対策コース',
        subtitle: '特定技能（SSW）ビザ取得のための実践的プログラム',
        description: '国際交流基金日本語基礎テスト（JFT-Basic）CBT試験対策と現場で役立つ実践日本語。',
        features: JSON.stringify(['いろどり教材対応', 'CBT本番形式演習', '職場実務コミュニケーション', '面接・書類指導']),
        curriculum: JSON.stringify([]),
        faq: JSON.stringify([]),
      },
    ],
  };

  const existing = await prisma.course.findUnique({ where: { slug: jftData.slug } });
  if (existing) {
    await prisma.course.update({
      where: { slug: jftData.slug },
      data: {
        baseFee: jftData.baseFee,
        badge: jftData.badge,
        published: true,
      },
    });
    console.log('✔ JFT-Basic course updated in Neon PostgreSQL!');
  } else {
    await prisma.course.create({
      data: {
        slug: jftData.slug,
        level: jftData.level,
        baseFee: jftData.baseFee,
        currency: jftData.currency,
        duration: jftData.duration,
        schedule: jftData.schedule,
        badge: jftData.badge,
        featured: jftData.featured,
        published: jftData.published,
        translations: {
          create: jftData.translations,
        },
      },
    });
    console.log('✔ JFT-Basic course successfully created in Neon PostgreSQL!');
  }
}

addJft()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
