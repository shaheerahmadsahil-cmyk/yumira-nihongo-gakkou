const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Neon PostgreSQL database...');

  // 1. Admin Users
  const passwordHash = await bcrypt.hash('123456', 12);
  
  await prisma.user.upsert({
    where: { email: 'mdrabdurazzakrakib@gmail.com' },
    update: { passwordHash, name: 'Muhammad Abdur Razzak (Admin)' },
    create: {
      email: 'mdrabdurazzakrakib@gmail.com',
      passwordHash,
      name: 'Muhammad Abdur Razzak (Admin)',
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@yumira.com' },
    update: { passwordHash, name: 'Yumira Admin' },
    create: {
      email: 'admin@yumira.com',
      passwordHash,
      name: 'Yumira Admin',
      role: 'ADMIN',
    },
  });
  console.log('✔ Admin accounts created.');

  // 2. Website Settings
  const settings = [
    { key: 'agency_name', value: 'Yumira Nihongo Gakkou', description: 'Official Academy Name' },
    { key: 'tagline', value: 'স্বপ্ন ও ভবিষ্যৎ — Dream • Grow • Achieve • A Future Without Limits', description: 'Agency Tagline' },
    { key: 'whatsapp_number', value: '8801341017323', description: 'Official WhatsApp Number' },
    { key: 'phone', value: '+880 1341-017323', description: 'Contact Phone Number' },
    { key: 'email', value: 'admissions@yumira.com', description: 'Contact Email Address' },
    { key: 'address', value: 'Dhaka, Bangladesh', description: 'Campus Physical Address' },
    { key: 'office_hours', value: 'Sat - Thu: 9:00 AM - 8:00 PM (Friday Closed)', description: 'Academy Office Hours' },
  ];

  for (const s of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log('✔ Website settings created.');

  // 3. Courses (N5, N4, N3)
  const coursesData = [
    {
      slug: 'jlpt-n5',
      level: 'N5',
      baseFee: 8000,
      currency: 'BDT',
      duration: '4 Months',
      schedule: '3 Days / Week (Evening)',
      badge: 'Most Popular',
      featured: true,
      published: true,
      translations: [
        {
          locale: 'bn',
          title: 'JLPT N5 কমপ্লিট বিগিনার কোর্স',
          subtitle: 'হিরাগানা, কাতাকানা, প্রাথমিক ব্যাকরণ ও ১০০টি কানজি',
          description: 'জাপানি ভাষা শিক্ষার প্রথম ধাপ। শুরু থেকে সম্পূর্ণ প্রস্তুতি।',
          features: JSON.stringify(['হিরাগানা ও কাতাকানা মাস্টারি', '১০০টি প্রয়োজনীয় কানজি', '৮০০টি শব্দভাণ্ডার', 'ফ্রি মক টেস্ট ও লাইভ প্র্যাকটিস']),
          curriculum: JSON.stringify([
            { module: 'Module 1', hours: '30h', topics: ['হিরাগানা ও কাতাকানা', 'উচ্চারণ ও বেসিক শব্দ', 'সাধারণ শুভেচ্ছা ও শিষ্টাচার'] },
            { module: 'Module 2', hours: '40h', topics: ['পার্টিকল (は, が, を, に, で)', 'ক্রিয়ার প্রকারভেদ ও পরিবর্তন', 'দৈনন্দিন বাক্য গঠন'] },
          ]),
          faq: JSON.stringify([
            { q: 'ক্লাস কি অনলাইনে হবে?', a: 'হ্যাঁ, লাইভ ইন্টারেক্টিভ জুম ক্লাসে হবে এবং ক্লাস রেকর্ডিং দেওয়া হবে।' },
            { q: 'ভর্তি হতে কী লাগবে?', a: 'আমাদের WhatsApp নম্বরে মেসেজ দিয়ে বা ফর্ম পূরণ করে সহজেই ভর্তি সম্পন্ন করতে পারবেন।' },
          ]),
        },
        {
          locale: 'en',
          title: 'JLPT N5 Complete Beginner Course',
          subtitle: 'Hiragana, Katakana, basic grammar & 100 essential Kanji',
          description: 'The ultimate beginner course for learning Japanese from scratch.',
          features: JSON.stringify(['Hiragana & Katakana Mastery', '100 Essential Kanji', '800+ Vocabulary words', 'Free Mock Tests']),
          curriculum: JSON.stringify([
            { module: 'Module 1', hours: '30h', topics: ['Kana Writing', 'Greetings', 'Basic Vocabulary'] },
          ]),
          faq: JSON.stringify([]),
        },
        {
          locale: 'ja',
          title: 'JLPT N5 初級総合コース',
          subtitle: 'ひらがな、カタカナ、基本文法と漢字100字',
          description: 'ゼロから始める完全初心者向け日本語コース。',
          features: JSON.stringify(['ひらがな・カタカナ習得', '必須漢字100字', '800語の語彙', '模擬試験付き']),
          curriculum: JSON.stringify([]),
          faq: JSON.stringify([]),
        },
      ],
    },
    {
      slug: 'jlpt-n4',
      level: 'N4',
      baseFee: 10000,
      currency: 'BDT',
      duration: '4 Months',
      schedule: '3 Days / Week (Evening)',
      badge: 'Intermediate',
      featured: true,
      published: true,
      translations: [
        {
          locale: 'bn',
          title: 'JLPT N4 এলিমেন্টারি কোর্স',
          subtitle: 'দৈনন্দিন কথোপকথন, ৩০০টি কানজি ও উন্নত ব্যাকরণ',
          description: 'জাপানে উচ্চশিক্ষা ও জবের জন্য অপরিহার্য স্তর।',
          features: JSON.stringify(['৩০০টি কানজি', '১৫০০টি শব্দভাণ্ডার', 'লিসেনিং ও রিডিং প্র্যাকটিস', 'ন্যাচারাল কনভারসেশন']),
          curriculum: JSON.stringify([
            { module: 'Module 1', hours: '35h', topics: ['জটিল পার্টিকল', 'ইচ্ছা ও সম্ভাবনাময় বাক্য', '৩০০টি কানজি প্র্যাকটিস'] },
          ]),
          faq: JSON.stringify([]),
        },
        {
          locale: 'en',
          title: 'JLPT N4 Elementary Course',
          subtitle: 'Daily conversation, 300 Kanji & intermediate grammar',
          description: 'Essential level for students and professionals targeting Japan.',
          features: JSON.stringify(['300 Kanji characters', '1,500+ Vocabulary words', 'Listening & Reading drills']),
          curriculum: JSON.stringify([]),
          faq: JSON.stringify([]),
        },
        {
          locale: 'ja',
          title: 'JLPT N4 初中級コース',
          subtitle: '日常会話、漢字300字、応用文法',
          description: '日本留学・就職を目指す方のための重要ステップ。',
          features: JSON.stringify(['漢字300字', '語彙1500語', '聴解・読解演習']),
          curriculum: JSON.stringify([]),
          faq: JSON.stringify([]),
        },
      ],
    },
    {
      slug: 'jlpt-n3',
      level: 'N3',
      baseFee: 12000,
      currency: 'BDT',
      duration: '5 Months',
      schedule: '3 Days / Week (Evening)',
      badge: 'Bridge to Fluent',
      featured: true,
      published: true,
      translations: [
        {
          locale: 'bn',
          title: 'JLPT N3 ইন্টারমিডিয়েট কোর্স',
          subtitle: 'ন্যাচারাল স্পিড জাপানিজ, ৬৫০টি কানজি ও বিজনেস বেসিক',
          description: 'জাপানিজ কর্মক্ষেত্রে সরাসরি কাজ করার জন্য প্রফেশনাল প্রস্তুতি।',
          features: JSON.stringify(['৬৫০টি অ্যাডভান্সড কানজি', 'অফিসিয়াল ডকুমেন্ট রিডিং', 'বিজনেস ম্যানার ও ইমেইল', 'ফুল মক টেস্ট সিরিজ']),
          curriculum: JSON.stringify([]),
          faq: JSON.stringify([]),
        },
        {
          locale: 'en',
          title: 'JLPT N3 Intermediate Course',
          subtitle: 'Natural speed Japanese, 650 Kanji & business basics',
          description: 'Professional preparation for working and thriving in Japan.',
          features: JSON.stringify(['650 Advanced Kanji', 'Official Document Reading', 'Business Manners']),
          curriculum: JSON.stringify([]),
          faq: JSON.stringify([]),
        },
        {
          locale: 'ja',
          title: 'JLPT N3 中級総合コース',
          subtitle: '自然な会話スピード、漢字650字、ビジネス基礎',
          description: '日本での就労や高度な進学のための本格的プログラム。',
          features: JSON.stringify(['応用漢字650字', '公的文書読解', 'ビジネスマナー']),
          curriculum: JSON.stringify([]),
          faq: JSON.stringify([]),
        },
      ],
    },
  ];

  for (const c of coursesData) {
    const existing = await prisma.course.findUnique({ where: { slug: c.slug } });
    if (!existing) {
      await prisma.course.create({
        data: {
          slug: c.slug,
          level: c.level,
          baseFee: c.baseFee,
          currency: c.currency,
          duration: c.duration,
          schedule: c.schedule,
          badge: c.badge,
          featured: c.featured,
          published: c.published,
          translations: {
            create: c.translations,
          },
        },
      });
    }
  }
  console.log('✔ Courses created.');

  // 4. Kanji Library Entries
  const kanjis = [
    { character: '日', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, -び, -か', furigana: 'ひ', meaningEn: 'Day, Sun', meaningBn: 'দিন, সূর্য, জাপান', meaningJa: '日、太陽', jlptLevel: 'N5', strokeCount: 4, order: 1, exampleWords: '[]', exampleSentences: '[]' },
    { character: '本', onyomi: 'ホン', kunyomi: 'もと', furigana: 'ほん', meaningEn: 'Book, Origin', meaningBn: 'বই, মূল', meaningJa: '本、基本', jlptLevel: 'N5', strokeCount: 5, order: 2, exampleWords: '[]', exampleSentences: '[]' },
    { character: '人', onyomi: 'ジン, ニン', kunyomi: 'ひと', furigana: 'ひと', meaningEn: 'Person', meaningBn: 'মানুষ, ব্যক্তি', meaningJa: '人、人間', jlptLevel: 'N5', strokeCount: 2, order: 3, exampleWords: '[]', exampleSentences: '[]' },
    { character: '月', onyomi: 'ゲツ, ガツ', kunyomi: 'つき', furigana: 'つき', meaningEn: 'Month, Moon', meaningBn: 'মাস, চাঁদ', meaningJa: '月', jlptLevel: 'N5', strokeCount: 4, order: 4, exampleWords: '[]', exampleSentences: '[]' },
    { character: '火', onyomi: 'カ', kunyomi: 'ひ, -び, ほ-', furigana: 'ひ', meaningEn: 'Fire', meaningBn: 'আগুন', meaningJa: '火', jlptLevel: 'N5', strokeCount: 4, order: 5, exampleWords: '[]', exampleSentences: '[]' },
    { character: '水', onyomi: 'スイ', kunyomi: 'みず', furigana: 'みず', meaningEn: 'Water', meaningBn: 'পানি/জল', meaningJa: '水', jlptLevel: 'N5', strokeCount: 4, order: 6, exampleWords: '[]', exampleSentences: '[]' },
    { character: '木', onyomi: 'ボク, モク', kunyomi: 'き, こ-', furigana: 'き', meaningEn: 'Tree, Wood', meaningBn: 'গাছ, কাঠ', meaningJa: '木', jlptLevel: 'N5', strokeCount: 4, order: 7, exampleWords: '[]', exampleSentences: '[]' },
    { character: '金', onyomi: 'キン, コン', kunyomi: 'かね, かな-', furigana: 'かね', meaningEn: 'Gold, Money', meaningBn: 'টাকা, সোনা', meaningJa: '金、お金', jlptLevel: 'N5', strokeCount: 8, order: 8, exampleWords: '[]', exampleSentences: '[]' },
    { character: '土', onyomi: 'ド, ト', kunyomi: 'つち', furigana: 'つち', meaningEn: 'Soil, Earth', meaningBn: 'মাটি', meaningJa: '土', jlptLevel: 'N5', strokeCount: 3, order: 9, exampleWords: '[]', exampleSentences: '[]' },
    { character: '学', onyomi: 'ガク', kunyomi: 'まな・ぶ', furigana: 'まなぶ', meaningEn: 'Study, Learn', meaningBn: 'শেখা, বিদ্যা', meaningJa: '学ぶ', jlptLevel: 'N5', strokeCount: 8, order: 10, exampleWords: '[]', exampleSentences: '[]' },
  ];

  for (const k of kanjis) {
    const existing = await prisma.kanji.findFirst({ where: { character: k.character } });
    if (!existing) {
      await prisma.kanji.create({ data: k });
    }
  }
  console.log('✔ Kanji entries created.');

  // 5. Mock Tests
  const existingTest = await prisma.mockTest.findUnique({ where: { id: 'test-n5-01' } });
  if (!existingTest) {
    await prisma.mockTest.create({
      data: {
        id: 'test-n5-01',
        jlptLevel: 'N5',
        title: 'JLPT N5 Comprehensive Simulation Mock Exam',
        titleBn: 'JLPT N5 পূর্ণাঙ্গ সিমুলেশন মক টেস্ট',
        titleJa: 'JLPT N5 公式模擬試験 01',
        description: 'Authentic JLPT N5 exam with 16 questions: Kanji, Vocab, Grammar, Reading, and Listening Audio.',
        descriptionBn: 'JLPT N5 প্যাটার্নে তৈরি ১৬টি প্রশ্নের পূর্ণাঙ্গ টেস্ট।',
        descriptionJa: '文字・語彙・文法・読解・聴解総合実力判定模擬試験。',
        timeLimitMinutes: 45,
        totalMarks: 100,
        passingScore: 60,
        published: true,
      },
    });
  }
  console.log('✔ Mock tests created.');

  console.log('🎉 Neon database seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
