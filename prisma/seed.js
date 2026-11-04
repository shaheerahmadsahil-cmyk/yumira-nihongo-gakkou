const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial database data...');

  // 1. Website Settings
  const settings = [
    { key: 'whatsapp_number', value: '8801341017323', description: 'Official WhatsApp admission number (international format)' },
    { key: 'agency_name', value: 'Yumira Nihongo Gakkou', description: 'Official Academy Name' },
    { key: 'agency_tagline', value: 'স্বপ্ন ও ভবিষ্যৎ — Dream • Grow • Achieve • A Future Without Limits', description: 'Agency Tagline' },
    { key: 'agency_logo', value: '/images/yumira-logo.jpg', description: 'Official Academy Logo' },
    { key: 'agency_phone', value: '+880 1341-017323', description: 'Customer Service Helpline' },
    { key: 'agency_email', value: 'admissions@yumira.com', description: 'Official Inquiries Email' },
    { key: 'agency_address', value: 'Level 4, Tokyo Tower Complex, Banani C/A, Dhaka 1213, Bangladesh', description: 'Campus Physical Address' },
    { key: 'facebook_url', value: 'https://facebook.com/yumiranihongo', description: 'Facebook Page URL' },
    { key: 'youtube_url', value: 'https://youtube.com/@yumiranihongo', description: 'YouTube Channel URL' },
    { key: 'office_hours', value: 'Saturday – Thursday: 9:00 AM – 8:00 PM (Friday Closed)', description: 'Weekly Office Hours' },
  ];

  for (const s of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log('✓ Website settings seeded');

  // 2. Courses (N5, N4, N3)
  const coursesData = [
    {
      slug: 'n5',
      level: 'N5',
      baseFee: 12000,
      currency: 'BDT',
      duration: '4 Months (60 Classes)',
      schedule: '3 Days / Week (2 Hours / Class)',
      badge: 'Most Popular for Beginners',
      translations: {
        en: {
          title: 'JLPT N5 Complete Mastery Course',
          subtitle: 'The ultimate beginner pathway to Japanese language fluency and NAT-TEST / JLPT certification.',
          description: 'Designed specifically for beginners with zero Japanese background. Master Hiragana, Katakana, 100+ Essential Kanji, 800+ core vocabulary words, and basic conversational grammar. Includes mock exams, audio listening sessions, and full admission guidance for Japanese Language Schools (SSW & Student Visa).',
          curriculum: JSON.stringify([
            { title: 'Module 1: Japanese Writing Systems', topics: ['Hiragana & Katakana Mastery', 'Pronunciation & Pitch Accents', 'Dakuten, Yoon & Long Vowels'] },
            { title: 'Module 2: Essential Grammar & Sentence Structures', topics: ['Particles は, が, を, に, で, と', 'Verb Conjugations (Masu, Te, Nai, Ta forms)', 'Adjectives (I-adjectives & Na-adjectives)'] },
            { title: 'Module 3: Daily Conversation & Culture', topics: ['Greetings & Introductions', 'Shopping & Ordering Food', 'Directions & Time Expressions'] },
            { title: 'Module 4: JLPT N5 Exam Prep & Mock Tests', topics: ['Kanji 100+ with radicals', 'Vocabulary 800+ drills', '5 Full-length Timed Mock Examinations'] }
          ]),
          features: JSON.stringify([
            'Live interactive classes + recorded backup',
            'Full Minna no Nihongo I curriculum',
            'Free printed Japanese character workbooks',
            'Weekly vocabulary quizzes & feedback',
            'Japan Student Visa & Embassy Interview Prep'
          ]),
          faq: JSON.stringify([
            { question: 'Do I need any prior knowledge of Japanese?', answer: 'None at all! We start from the very basics of Hiragana and Katakana.' },
            { question: 'Are classes available online or offline?', answer: 'Both options are available. Online batches feature high-definition live interactive sessions.' },
            { question: 'What is the passing rate of your students?', answer: 'Over 94% of our dedicated students pass JLPT N5 on their very first attempt.' }
          ])
        },
        bn: {
          title: 'জেএলপিটি এন৫ সম্পূর্ণ প্রস্তুতি কোর্স',
          subtitle: 'জাপানি ভাষা শেখার সেরা শুরু — একদম শূন্য থেকে শতভাগ জেএলপিটি ও নাট-টেস্ট পাসের নিশ্চয়তা।',
          description: 'হিরাগানা, কাতাকানা, ১০০+ কাঞ্জি, ৮০০+ প্রয়োজনীয় শব্দভাণ্ডার এবং প্রাথমিক জাপানি ব্যাকরণের পূর্ণাঙ্গ কোর্স। মিন্না নো নিহোঙ্গো বইয়ের প্রতিটি পাঠ সহজ বাংলায় ব্যাখ্যা করা হবে। সাথে থাকছে বিশেষ লিসেনিং সেশন, স্পিকিং প্র্যাকটিস এবং জাপান স্টুডেন্ট ভিসা ও এসএসডব্লিউ ভিসার নিখরচায় পরামর্শ।',
          curriculum: JSON.stringify([
            { title: 'মডিউল ১: জাপানি বর্ণমালা ও উচ্চারণ', topics: ['হিরাগানা ও কাতাকানা লিখন ও পঠন', 'সঠিক উচ্চারণ ও পিচ অ্যাকসেন্ট', 'ডাকুতেন, হান্দাকুতেন ও ইয়োন অক্ষর'] },
            { title: 'মডিউল ২: মৌলিক ব্যাকরণ ও বাক্য গঠন', topics: ['পার্টিকেল は, が, を, に, で, と এর ব্যবহার', 'ক্রিয়াপদের রূপান্তর (মাসু, তে, নাই, তা ফর্ম)', 'বিশেষণের ব্যবহার (ই-অ্যাডজেক্টিভ ও না-অ্যাডজেক্টিভ)'] },
            { title: 'মডিউল ৩: দৈনন্দিন কথোপকথন ও জাপানি সংস্কৃতি', topics: ['পরিচয় পর্ব ও কুশল বিনিময়', 'দোকানে কেনাকাটা ও রেস্তোরাঁয় অর্ডার', 'দিক-নির্দেশনা ও সময়ের প্রকাশভঙ্গি'] },
            { title: 'মডিউল ৪: পরীক্ষার চূড়ান্ত প্রস্তুতি ও মক টেস্ট', topics: ['১০০+ কাঞ্জি সহজে মনে রাখার কৌশল', '৮০০+ শব্দভাণ্ডার অনুশীলন', '৫টি পূর্ণাঙ্গ সময়সীমাবদ্ধ মক পরীক্ষা'] }
          ]),
          features: JSON.stringify([
            'অভিজ্ঞ শিক্ষকদের সরাসরি পাঠদান ও রেকর্ডেড ক্লাস সুবিধা',
            'মিন্না নো নিহোঙ্গো ১ সম্পূর্ণ পাঠ্যসূচি',
            'বিনামূল্যে জাপানি বর্ণমালা লেখার ওয়ার্কবুক',
            'সাপ্তাহিক ভোকাবুলারি টেস্ট ও ব্যক্তিগত ফিডব্যাক',
            'জাপান স্টুডেন্ট ভিসা ও অ্যাম্বাসি ইন্টারভিউ প্রস্তুতি'
          ]),
          faq: JSON.stringify([
            { question: 'আমার কি আগে থেকে কোনো জাপানি জানার প্রয়োজন আছে?', answer: 'একদমই না! আমরা হিরাগানা এবং কাতাকানার প্রথম বর্ণ থেকে হাতে-কলমে শুরু করি।' },
            { question: 'ক্লাস কি অনলাইন নাকি অফলাইনে হয়?', answer: 'অনলাইন ও অফলাইন উভয় ব্যাচেই ভর্তির সুযোগ রয়েছে।' },
            { question: 'কোর্সের ফি কীভাবে পরিশোধ করা যাবে?', answer: 'বিকাশ, নগদ, রকেট অথবা ব্যাংকের মাধ্যমে এককালীন বা কিস্তিতে পরিশোধ করা যায়।' }
          ])
        },
        ja: {
          title: 'JLPT N5 完全マスターコース',
          subtitle: '日本語学習の第一歩 — 基礎から確実に合格を目指す総合カリキュラム。',
          description: 'ひらがな、カタカナから始まり、基本漢字100字、重要語彙800語、初級文法を徹底的に学びます。模擬試験、リスニング強化、日本留学・就労サポートも充実しています。',
          curriculum: JSON.stringify([
            { title: 'モジュール 1: 文字と発音', topics: ['ひらがな・カタカナの完全習得', '正確な発音とアクセント', '濁音・半濁音・拗音'] },
            { title: 'モジュール 2: 基本文法', topics: ['助詞（は、が、を、に、で、と）', '動詞の活用形（ます形、て形、ない形、た形）', '形容詞（い形容詞・な形容詞）'] },
            { title: 'モジュール 3: 実践会話', topics: ['自己紹介と日常挨拶', '買い物・外食の会話', '道案内と時間表現'] },
            { title: 'モジュール 4: 試験対策と模擬試験', topics: ['必須漢字100字の習得', '重要語彙800語ドリル', 'タイマー付き本番形式模擬試験5回'] }
          ]),
          features: JSON.stringify([
            '経験豊富な講師によるインタラクティブ講義',
            '『みんなの日本語 初級I』完全対応',
            'オリジナル練習帳と学習教材の提供',
            '週次テストと個別フィードバック',
            '留学・就労ビザ面接対策'
          ]),
          faq: JSON.stringify([
            { question: '日本語の前提知識がなくても受講できますか？', answer: 'はい、ゼロから丁寧に指導しますのでご安心ください。' },
            { question: 'オンライン受講は可能ですか？', answer: 'はい、完全オンラインおよびハイブリッド形式に対応しています。' }
          ])
        }
      }
    },
    {
      slug: 'n4',
      level: 'N4',
      baseFee: 15000,
      currency: 'BDT',
      duration: '4.5 Months (68 Classes)',
      schedule: '3 Days / Week (2 Hours / Class)',
      badge: 'Required for SSW / Work Visa',
      translations: {
        en: {
          title: 'JLPT N4 Intermediate Accelerator Course',
          subtitle: 'Essential qualification for Specified Skilled Worker (SSW) visas, vocational schools, and Japanese jobs.',
          description: 'Bridge the gap between basic and practical conversational Japanese. Master 300+ Kanji, 1,500+ vocabulary items, complex verb potential, passive, and causative conjugations, honorifics introduction, and fluent daily workplace conversations.',
          curriculum: JSON.stringify([
            { title: 'Module 1: Complex Grammar Patterns', topics: ['Potential Form (〜ことができる, 〜れる)', 'Passive & Causative (受身・使役)', 'Conditional Forms (〜たら, 〜ば, 〜なら)'] },
            { title: 'Module 2: Workplace & Social Japanese', topics: ['Expressing Intentions & Plans', 'Giving & Receiving (あげる, もらう, くれる)', 'Polite & Formal Speech (Keigo Basics)'] },
            { title: 'Module 3: N4 Kanji & Reading Comprehension', topics: ['300+ Kanji with compound readings', 'Short stories & business emails', 'JLPT reading speed tactics'] },
            { title: 'Module 4: Exam Strategy & Intensive Mock Tests', topics: ['Listening section tricks', 'Error-avoidance drills', '6 Complete N4 Mock Tests'] }
          ]),
          features: JSON.stringify([
            'Complete Minna no Nihongo II coverage',
            'SSW Skills Test + JFT-Basic alignment',
            'Native audio listening comprehension labs',
            'Interview training for Japanese employers'
          ]),
          faq: JSON.stringify([
            { question: 'Can I apply for an SSW work visa with N4?', answer: 'Yes! JLPT N4 or JFT-Basic A2 is the official minimum language requirement for Japan SSW visas.' }
          ])
        },
        bn: {
          title: 'জেএলপিটি এন৪ ইন্টারমিডিয়েট কোর্স',
          subtitle: 'জাপানে চাকরি ও এসএসডব্লিউ (SSW) ভিসার জন্য অপরিহার্য যোগ্যতা অর্জন করুন।',
          description: 'এন৪ লেভেল সম্পন্ন করলে আপনি জাপানের সাধারণ পরিবেশ ও কর্মক্ষেত্রে স্বাভাবিক কথাবার্তা বলতে ও বুঝতে সক্ষম হবেন। ৩০০+ কাঞ্জি, ১৫০০+ শব্দভাণ্ডার এবং পটেনশিয়াল, প্যাসিভ, কজেটিভ গ্রামার প্যাটার্ন সহজে শেখানো হয়। জেএফটি বেসিক ও এসএসডব্লিউ প্রার্থীদের জন্য বিশেষ কোচিং অন্তর্ভুক্ত।',
          curriculum: JSON.stringify([
            { title: 'মডিউল ১: উন্নত ব্যাকরণ কাঠামো', topics: ['পটেনশিয়াল ফর্ম (সামর্থ্য প্রকাশ)', 'প্যাসিভ ও কজেটিভ বাক্যরীতি', 'শর্তবোধক বাক্য (তারা, বা, তো, নারা)'] },
            { title: 'মডিউল ২: কর্মক্ষেত্রের কথোপকথন ও কেইগো', topics: ['দেওয়া-নেওয়া (আগেরু, মোরাউ, কুরেরু)', 'পরিকল্পনা ও মতামত প্রকাশ', 'প্রাথমিক সম্মানসূচক ভাষা (কেইগো)'] },
            { title: 'মডিউল ৩: কাঞ্জি ও রিডিং কম্প্রিহেনশন', topics: ['৩০০+ গুরুত্বপূর্ণ কাঞ্জি ও কম্পাউন্ড শব্দ', 'সংবাদ ও দৈনন্দিন চিঠি পড়া', 'দ্রুত রিডিং প্যাসেজ সমাধানের কৌশল'] },
            { title: 'মডিউল ৪: চূড়ান্ত মক টেস্ট ও কৌশল', topics: ['লিসেনিং অডিও বোঝার শর্টকাট', 'ভুল এড়ানোর গাইডলাইন', '৬টি পূর্ণাঙ্গ এন৪ মক টেস্ট'] }
          ]),
          features: JSON.stringify([
            'মিন্না নো নিহোঙ্গো ২ সম্পূর্ণ কভারেজ',
            'জেএফটি বেসিক এবং এসএসডব্লিউ ভিসা প্রস্তুতি',
            'নেটিভ জাপানি অডিও লিসেনিং ল্যাব',
            'জাপানি নিয়োগকর্তাদের ইন্টারভিউ প্রস্তুতি'
          ]),
          faq: JSON.stringify([
            { question: 'এন৪ দিয়ে কি জাপানে কাজের ভিসায় আবেদন করা যায়?', answer: 'হ্যাঁ! স্পেসিফাইড স্কিলড ওয়ার্কার (SSW) ভিসার জন্য এন৪ বা জেএফটি বেসিক বাধ্যতামূলক।' }
          ])
        },
        ja: {
          title: 'JLPT N4 中級アクセラレーターコース',
          subtitle: '特定技能ビザ・専門学校進学に必須の日本語力を養成。',
          description: '基本的な日常会話を超え、職場や社会生活で役立つ実践的な日本語を習得します。漢字300字、語彙1500語、受身・使役・可能表現などを徹底的にカバーします。',
          curriculum: JSON.stringify([
            { title: 'モジュール 1: 複文・応用文法', topics: ['可能形・受身形・使役形', '条件表現（〜たら、〜ば、〜なら）', '授受表現（あげる・もらう・くれる）'] },
            { title: 'モジュール 2: ビジネスと生活の日本語', topics: ['意志・予定の表現', '敬語の基礎（尊敬語・謙譲語・丁寧語）', '電話対応とメールの基礎'] },
            { title: 'モジュール 3: 読解と漢字', topics: ['漢字300字の読み書き', '短文・中文読解の速読法', '実用文書の読解'] },
            { title: 'モジュール 4: 模擬試験と対策', topics: ['聴解セクション攻略法', '本番形式模擬試験6回'] }
          ]),
          features: JSON.stringify([
            '『みんなの日本語 初級II』完全網羅',
            '特定技能・JFT-Basic試験対策',
            'ネイティブ音声によるリスニング演習',
            '面接対策指導'
          ]),
          faq: []
        }
      }
    },
    {
      slug: 'n3',
      level: 'N3',
      baseFee: 18000,
      currency: 'BDT',
      duration: '5 Months (75 Classes)',
      schedule: '3 Days / Week (2.5 Hours / Class)',
      badge: 'University & Engineer Gateway',
      translations: {
        en: {
          title: 'JLPT N3 Pre-Advanced Mastery Course',
          subtitle: 'The vital bridge to Japanese corporate careers, university admissions, and high-paying engineering roles.',
          description: 'Master 650+ Kanji, 3,750+ vocabulary words, and native-level nuanced grammar expressions. Read newspaper excerpts, understand normal-speed native Japanese speech, and gain the exact skills required for engineering and corporate job interviews.',
          curriculum: JSON.stringify([
            { title: 'Module 1: Advanced Nuanced Grammar', topics: ['Expressing Causes & Reasons (〜せいで, 〜おかげで)', 'Degrees & Comparisons (〜ほど, 〜くらい)', 'Hypotheticals & Counter-expectations'] },
            { title: 'Module 2: Business Japanese & Keigo Mastery', topics: ['Sonkeigo, Kenjougo & Teineigo mastery', 'Japanese business manners & etiquette', 'Client emails & presentation skills'] },
            { title: 'Module 3: N3 Reading Speed & Critical Thinking', topics: ['650+ Kanji compounds', 'Editorial columns & essay comprehension', 'Long-passage keyword extraction'] },
            { title: 'Module 4: High-Scoring Examination Engine', topics: ['Real-speed native listening tasks', 'Deep grammar distractor analysis', '8 Full-length N3 Mock Tests'] }
          ]),
          features: JSON.stringify([
            'Shinkanzen Master & Sou Matome blended syllabus',
            '1-on-1 Japanese IT / Engineering Resume review',
            'Native Japanese guest lecture sessions',
            'Lifetime access to JLPT N3 question banks'
          ]),
          faq: [
            { question: 'Why is N3 considered the most critical level?', answer: 'N3 bridges conversational fluency and professional fluency, unlocking higher education and IT job opportunities in Japan.' }
          ]
        },
        bn: {
          title: 'জেএলপিটি এন৩ প্রি-অ্যাডভান্সড কোর্স',
          subtitle: 'জাপানে কর্পোরেট চাকরি, বিশ্ববিদ্যালয় ভর্তি এবং আইটি ইঞ্জিনিয়ারিং ক্যারিয়ারের প্রবেশদ্বার।',
          description: 'এন৩ হলো প্রাথমিক থেকে উচ্চতর প্রফেশনাল জাপানি ভাষার সংযোগসেতু। ৬৫০+ কাঞ্জি, ৩৭৫০+ শব্দভাণ্ডার এবং জটিল ব্যাকরণিক বাক্য গঠনের গভীর প্রশিক্ষণ। জাপানি সংবাদপত্র পড়া, দ্রুতগতির কথোপকথন বোঝা এবং করপোরেট ইন্টারভিউতে সাবলীলভাবে কথা বলার জন্য এটি আদর্শ কোর্স।',
          curriculum: JSON.stringify([
            { title: 'মডিউল ১: উন্নত ব্যাকরণ ও গভীর বিশ্লেষণ', topics: ['কারণ ও ফলাফল (せい・おかげ)', 'মাত্রা ও তুলনা (ほど・くらい)', 'পরিস্থিতিভিত্তিক ব্যাকরণ প্রয়োগ'] },
            { title: 'মডিউল ২: বিজনেস কেইগো ও করপোরেট যোগাযোগ', topics: ['সনকেইগো, কেনজৌগো ও তেইনেইগো নিখুঁত প্রয়োগ', 'জাপানি বিজনেস এটিকেট ও আচরণবিধি', 'ইমেইল ও প্রেজেন্টেশন স্কিল'] },
            { title: 'মডিউল ৩: কাঞ্জি ও দীর্ঘ পাঠ্যাংশ সমাধান', topics: ['৬৫০+ কাঞ্জি ও যৌগিক শব্দ', 'সম্পাদকীয় কলাম ও নিবন্ধ বিশ্লেষণ', 'দ্রুত কী-ওয়ার্ড খুঁজে বের করার কৌশল'] },
            { title: 'মডিউল ৪: হাই-স্কোরিং মক টেস্ট ইঞ্জিন', topics: ['প্রাকৃতিক গতির জাপানি লিসেনিং টেস্ট', 'গ্রামার অপশন ট্র্যাপ সমাধান', '৮টি পূর্ণাঙ্গ এন৩ মক টেস্ট'] }
          ]),
          features: JSON.stringify([
            'শিনকানজেন মাস্টার ও সো-মাতোমে সমন্বিত পাঠ্যক্রম',
            'জাপানি আইটি/ইঞ্জিনিয়ারিং সিভি তৈরির বিশেষ গাইডেন্স',
            'নেটিভ জাপানি শিক্ষকদের গেস্ট সেশন',
            'এন৩ প্রশ্নব্যাংক ও স্পেশাল লেকচার শিট'
          ]),
          faq: [
            { question: 'এন৩ শেষ করলে কি জাপানের কোম্পানিতে চাকরি পাওয়া যায়?', answer: 'অবশ্যই! বিশেষ করে ইঞ্জিনিয়ারিং, আইটি ও হসপিটালিটি সেক্টরে এন৩ লেভেল থাকলে চাকরি পাওয়া সহজ হয়।' }
          ]
        },
        ja: {
          title: 'JLPT N3 中上級マスターコース',
          subtitle: '日本での大学進学・IT企業就職へ向けた架け橋。',
          description: '漢字650字、語彙3,750語、複文構造や待遇表現を完全網羅。日常的な場面で使われる日本語に加え、やや難易度の高い文章や自然なスピードの会話を理解する力を養います。',
          curriculum: JSON.stringify([
            { title: 'モジュール 1: 中上級文法', topics: ['原因・理由のニュアンス（〜せいで、〜おかげで）', '程度・比較（〜ほど、〜くらい）', '仮定・逆接表現'] },
            { title: 'モジュール 2: ビジネス敬語とマナー', topics: ['尊敬語・謙譲語の使い分け', 'ビジネスメールと電話応対', '日本企業のビジネスマナー'] },
            { title: 'モジュール 3: 読解力向上', topics: ['漢字650字の習得', '論説文・エッセイ読解', '速読・スキミング技術'] },
            { title: 'モジュール 4: 総合試験対策', topics: ['自然なスピードの聴解演習', '本番形式模擬試験8回'] }
          ]),
          features: JSON.stringify([
            '『新完全マスター』・『総まとめ』準拠',
            'IT・エンジニア向け履歴書添削',
            '日本人講師による特別授業',
            'N3特化問題集の利用'
          ]),
          faq: []
        }
      }
    }
  ];

  for (const c of coursesData) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        level: c.level,
        baseFee: c.baseFee,
        currency: c.currency,
        duration: c.duration,
        schedule: c.schedule,
        badge: c.badge,
        published: true,
      },
      create: {
        slug: c.slug,
        level: c.level,
        baseFee: c.baseFee,
        currency: c.currency,
        duration: c.duration,
        schedule: c.schedule,
        badge: c.badge,
        published: true,
      },
    });

    for (const [locale, trans] of Object.entries(c.translations)) {
      await prisma.courseTranslation.upsert({
        where: {
          courseId_locale: {
            courseId: course.id,
            locale: locale,
          },
        },
        update: {
          title: trans.title,
          subtitle: trans.subtitle,
          description: trans.description,
          curriculum: trans.curriculum,
          features: trans.features,
          faq: typeof trans.faq === 'string' ? trans.faq : JSON.stringify(trans.faq),
        },
        create: {
          courseId: course.id,
          locale: locale,
          title: trans.title,
          subtitle: trans.subtitle,
          description: trans.description,
          curriculum: trans.curriculum,
          features: trans.features,
          faq: typeof trans.faq === 'string' ? trans.faq : JSON.stringify(trans.faq),
        },
      });
    }
  }
  console.log('✓ Courses & Translations seeded');

  // 3. Characters (Hiragana & Katakana)
  const hiraganaBasic = [
    { kana: 'あ', romaji: 'a', meaningBn: 'স্বরধ্বনি "আ"', meaningEn: 'Vowel "a"', exampleWord: 'あさ (asa)', exampleWordKana: 'あさ', exampleMeaningBn: 'সকাল', exampleMeaningEn: 'Morning' },
    { kana: 'い', romaji: 'i', meaningBn: 'স্বরধ্বনি "ই"', meaningEn: 'Vowel "i"', exampleWord: 'いぬ (inu)', exampleWordKana: 'いぬ', exampleMeaningBn: 'কুকুর', exampleMeaningEn: 'Dog' },
    { kana: 'う', romaji: 'u', meaningBn: 'স্বরধ্বনি "উ"', meaningEn: 'Vowel "u"', exampleWord: 'うみ (umi)', exampleWordKana: 'うみ', exampleMeaningBn: 'সমুদ্র', exampleMeaningEn: 'Sea / Ocean' },
    { kana: 'え', romaji: 'e', meaningBn: 'স্বরধ্বনি "এ"', meaningEn: 'Vowel "e"', exampleWord: 'えき (eki)', exampleWordKana: 'えき', exampleMeaningBn: 'রেল স্টেশন', exampleMeaningEn: 'Train Station' },
    { kana: 'お', romaji: 'o', meaningBn: 'স্বরধ্বনি "ও"', meaningEn: 'Vowel "o"', exampleWord: 'おかね (okane)', exampleWordKana: 'おかね', exampleMeaningBn: 'টাকা / অর্থ', exampleMeaningEn: 'Money' },

    { kana: 'か', romaji: 'ka', meaningBn: '"কা" ধ্বনি', meaningEn: 'Consonant sound "ka"', exampleWord: 'かさ (kasa)', exampleWordKana: 'かさ', exampleMeaningBn: 'ছাতা', exampleMeaningEn: 'Umbrella' },
    { kana: 'き', romaji: 'ki', meaningBn: '"কি" ধ্বনি', meaningEn: 'Consonant sound "ki"', exampleWord: 'き (ki)', exampleWordKana: 'き', exampleMeaningBn: 'গাছ', exampleMeaningEn: 'Tree' },
    { kana: 'く', romaji: 'ku', meaningBn: '"কু" ধ্বনি', meaningEn: 'Consonant sound "ku"', exampleWord: 'くるま (kuruma)', exampleWordKana: 'くるま', exampleMeaningBn: 'গাড়ি', exampleMeaningEn: 'Car' },
    { kana: 'け', romaji: 'ke', meaningBn: '"কে" ধ্বনি', meaningEn: 'Consonant sound "ke"', exampleWord: 'けさ (kesa)', exampleWordKana: 'けさ', exampleMeaningBn: 'আজ সকাল', exampleMeaningEn: 'This morning' },
    { kana: 'こ', romaji: 'ko', meaningBn: '"কো" ধ্বনি', meaningEn: 'Consonant sound "ko"', exampleWord: 'こども (kodomo)', exampleWordKana: 'こども', exampleMeaningBn: 'শিশু', exampleMeaningEn: 'Child' },

    { kana: 'さ', romaji: 'sa', meaningBn: '"সা" ধ্বনি', meaningEn: 'Consonant sound "sa"', exampleWord: 'さくら (sakura)', exampleWordKana: 'さくら', exampleMeaningBn: 'চেরি ব্লসম ফুল', exampleMeaningEn: 'Cherry blossom' },
    { kana: 'し', romaji: 'shi', meaningBn: '"শি" ধ্বনি', meaningEn: 'Consonant sound "shi"', exampleWord: 'しお (shio)', exampleWordKana: 'しお', exampleMeaningBn: 'লবণ', exampleMeaningEn: 'Salt' },
    { kana: 'す', romaji: 'su', meaningBn: '"সু" ধ্বনি', meaningEn: 'Consonant sound "su"', exampleWord: 'すし (sushi)', exampleWordKana: 'すし', exampleMeaningBn: 'সুশি খাবার', exampleMeaningEn: 'Sushi' },
    { kana: 'せ', romaji: 'se', meaningBn: '"সে" ধ্বনি', meaningEn: 'Consonant sound "se"', exampleWord: 'せんせい (sensei)', exampleWordKana: 'せんせい', exampleMeaningBn: 'শিক্ষক / শিক্ষক মশাই', exampleMeaningEn: 'Teacher' },
    { kana: 'そ', romaji: 'so', meaningBn: '"সো" ধ্বনি', meaningEn: 'Consonant sound "so"', exampleWord: 'そら (sora)', exampleWordKana: 'そら', exampleMeaningBn: 'আকাশ', exampleMeaningEn: 'Sky' },

    { kana: 'た', romaji: 'ta', meaningBn: '"তা" ধ্বনি', meaningEn: 'Consonant sound "ta"', exampleWord: 'たまご (tamago)', exampleWordKana: 'たまご', exampleMeaningBn: 'ডিম', exampleMeaningEn: 'Egg' },
    { kana: 'ち', romaji: 'chi', meaningBn: '"চি" ধ্বনি', meaningEn: 'Consonant sound "chi"', exampleWord: 'ちず (chizu)', exampleWordKana: 'ちず', exampleMeaningBn: 'মানচিত্র', exampleMeaningEn: 'Map' },
    { kana: 'つ', romaji: 'tsu', meaningBn: '"ৎসু" ধ্বনি', meaningEn: 'Consonant sound "tsu"', exampleWord: 'つき (tsuki)', exampleWordKana: 'つき', exampleMeaningBn: 'চাঁদ', exampleMeaningEn: 'Moon' },
    { kana: 'て', romaji: 'te', meaningBn: '"তে" ধ্বনি', meaningEn: 'Consonant sound "te"', exampleWord: 'て (te)', exampleWordKana: 'て', exampleMeaningBn: 'হাত', exampleMeaningEn: 'Hand' },
    { kana: 'と', romaji: 'to', meaningBn: '"তো" ধ্বনি', meaningEn: 'Consonant sound "to"', exampleWord: 'ともだち (tomodachi)', exampleWordKana: 'ともだち', exampleMeaningBn: 'বন্ধু', exampleMeaningEn: 'Friend' },

    { kana: 'な', romaji: 'na', meaningBn: '"না" ধ্বনি', meaningEn: 'Consonant sound "na"', exampleWord: 'なつ (natsu)', exampleWordKana: 'なつ', exampleMeaningBn: 'গ্রীষ্মকাল', exampleMeaningEn: 'Summer' },
    { kana: 'に', romaji: 'ni', meaningBn: '"নি" ধ্বনি', meaningEn: 'Consonant sound "ni"', exampleWord: 'にほん (nihon)', exampleWordKana: 'にほん', exampleMeaningBn: 'জাপান', exampleMeaningEn: 'Japan' },
    { kana: 'ぬ', romaji: 'nu', meaningBn: '"নু" ধ্বনি', meaningEn: 'Consonant sound "nu"', exampleWord: 'いぬ (inu)', exampleWordKana: 'いぬ', exampleMeaningBn: 'কুকুর', exampleMeaningEn: 'Dog' },
    { kana: 'ね', romaji: 'ne', meaningBn: '"নে" ধ্বনি', meaningEn: 'Consonant sound "ne"', exampleWord: 'ねこ (neko)', exampleWordKana: 'ねこ', exampleMeaningBn: 'বিড়াল', exampleMeaningEn: 'Cat' },
    { kana: 'の', romaji: 'no', meaningBn: '"নো" ধ্বনি', meaningEn: 'Consonant sound "no"', exampleWord: 'ノート (nooto)', exampleWordKana: 'ノート', exampleMeaningBn: 'খাতা / নোটবুক', exampleMeaningEn: 'Notebook' },

    { kana: 'は', romaji: 'ha', meaningBn: '"হা" ধ্বনি', meaningEn: 'Consonant sound "ha"', exampleWord: 'はな (hana)', exampleWordKana: 'はな', exampleMeaningBn: 'ফুল', exampleMeaningEn: 'Flower' },
    { kana: 'ひ', romaji: 'hi', meaningBn: '"হি" ধ্বনি', meaningEn: 'Consonant sound "hi"', exampleWord: 'ひと (hito)', exampleWordKana: 'ひと', exampleMeaningBn: 'মানুষ / ব্যক্তি', exampleMeaningEn: 'Person' },
    { kana: 'ふ', romaji: 'fu', meaningBn: '"ফু" ধ্বনি', meaningEn: 'Consonant sound "fu"', exampleWord: 'ふね (fune)', exampleWordKana: 'ふね', exampleMeaningBn: 'জাহাজ / নৌকা', exampleMeaningEn: 'Boat / Ship' },
    { kana: 'へ', romaji: 'he', meaningBn: '"হে" ধ্বনি', meaningEn: 'Consonant sound "he"', exampleWord: 'へや (heya)', exampleWordKana: 'へや', exampleMeaningBn: 'ঘর / রুম', exampleMeaningEn: 'Room' },
    { kana: 'ほ', romaji: 'ho', meaningBn: '"হো" ধ্বনি', meaningEn: 'Consonant sound "ho"', exampleWord: 'ほし (hoshi)', exampleWordKana: 'ほし', exampleMeaningBn: 'তারা / নক্ষত্র', exampleMeaningEn: 'Star' },

    { kana: 'ま', romaji: 'ma', meaningBn: '"মা" ধ্বনি', meaningEn: 'Consonant sound "ma"', exampleWord: 'まち (machi)', exampleWordKana: 'まち', exampleMeaningBn: 'শহর', exampleMeaningEn: 'Town / City' },
    { kana: 'み', romaji: 'mi', meaningBn: '"মি" ধ্বনি', meaningEn: 'Consonant sound "mi"', exampleWord: 'みず (mizu)', exampleWordKana: 'みず', exampleMeaningBn: 'পানি', exampleMeaningEn: 'Water' },
    { kana: 'む', romaji: 'mu', meaningBn: '"মু" ধ্বনি', meaningEn: 'Consonant sound "mu"', exampleWord: 'むし (mushi)', exampleWordKana: 'むし', exampleMeaningBn: 'কীটপতঙ্গ', exampleMeaningEn: 'Insect' },
    { kana: 'め', romaji: 'me', meaningBn: '"মে" ধ্বনি', meaningEn: 'Consonant sound "me"', exampleWord: 'め (me)', exampleWordKana: 'め', exampleMeaningBn: 'চোখ', exampleMeaningEn: 'Eye' },
    { kana: 'も', romaji: 'mo', meaningBn: '"মো" ধ্বনি', meaningEn: 'Consonant sound "mo"', exampleWord: 'もり (mori)', exampleWordKana: 'もり', exampleMeaningBn: 'বন / অরণ্য', exampleMeaningEn: 'Forest' },

    { kana: 'や', romaji: 'ya', meaningBn: '"ইয়া" ধ্বনি', meaningEn: 'Consonant sound "ya"', exampleWord: 'やま (yama)', exampleWordKana: 'やま', exampleMeaningBn: 'পাহাড় / পর্বত', exampleMeaningEn: 'Mountain' },
    { kana: 'ゆ', romaji: 'yu', meaningBn: '"ইউ" ধ্বনি', meaningEn: 'Consonant sound "yu"', exampleWord: 'ゆき (yuki)', exampleWordKana: 'ゆき', exampleMeaningBn: 'তুষার / বরফ', exampleMeaningEn: 'Snow' },
    { kana: 'よ', romaji: 'yo', meaningBn: '"ইয়ো" ধ্বনি', meaningEn: 'Consonant sound "yo"', exampleWord: 'よる (yoru)', exampleWordKana: 'よる', exampleMeaningBn: 'রাত', exampleMeaningEn: 'Night' },

    { kana: 'ら', romaji: 'ra', meaningBn: '"রা" ধ্বনি', meaningEn: 'Consonant sound "ra"', exampleWord: 'らいげつ (raigetsu)', exampleWordKana: 'らいげつ', exampleMeaningBn: 'পরের মাস', exampleMeaningEn: 'Next month' },
    { kana: 'り', romaji: 'ri', meaningBn: '"রি" ধ্বনি', meaningEn: 'Consonant sound "ri"', exampleWord: 'りんご (ringo)', exampleWordKana: 'りんご', exampleMeaningBn: 'আপেল', exampleMeaningEn: 'Apple' },
    { kana: 'る', romaji: 'ru', meaningBn: '"রু" ধ্বনি', meaningEn: 'Consonant sound "ru"', exampleWord: 'くるま (kuruma)', exampleWordKana: 'くるま', exampleMeaningBn: 'গাড়ি', exampleMeaningEn: 'Vehicle' },
    { kana: 'れ', romaji: 're', meaningBn: '"রে" ধ্বনি', meaningEn: 'Consonant sound "re"', exampleWord: 'れきし (rekishi)', exampleWordKana: 'れきし', exampleMeaningBn: 'ইতিহাস', exampleMeaningEn: 'History' },
    { kana: 'ろ', romaji: 'ro', meaningBn: '"রো" ধ্বনি', meaningEn: 'Consonant sound "ro"', exampleWord: 'ろうそく (rousoku)', exampleWordKana: 'ろうそく', exampleMeaningBn: 'মোমবাতি', exampleMeaningEn: 'Candle' },

    { kana: 'わ', romaji: 'wa', meaningBn: '"ওয়া" ধ্বনি', meaningEn: 'Consonant sound "wa"', exampleWord: 'わたし (watashi)', exampleWordKana: 'わたし', exampleMeaningBn: 'আমি', exampleMeaningEn: 'I / Me' },
    { kana: 'を', romaji: 'wo', meaningBn: 'পার্টিকেল "ও"', meaningEn: 'Object particle (wo)', exampleWord: 'みず を のむ', exampleWordKana: 'みず を のむ', exampleMeaningBn: 'পানি পান করা', exampleMeaningEn: 'Drink water' },
    { kana: 'ん', romaji: 'n', meaningBn: 'অনুনাসিক "ন"', meaningEn: 'Nasal "n"', exampleWord: 'ほん (hon)', exampleWordKana: 'ほん', exampleMeaningBn: 'বই', exampleMeaningEn: 'Book' },
  ];

  let order = 1;
  for (const char of hiraganaBasic) {
    await prisma.character.create({
      data: {
        type: 'hiragana',
        category: 'basic',
        kana: char.kana,
        romaji: char.romaji,
        meaningBn: char.meaningBn,
        meaningEn: char.meaningEn,
        exampleWord: char.exampleWord,
        exampleWordKana: char.exampleWordKana,
        exampleMeaningBn: char.exampleMeaningBn,
        exampleMeaningEn: char.exampleMeaningEn,
        order: order++,
      }
    });
  }

  // Hiragana Dakuten & Handakuten
  const hiraganaDakuten = [
    { kana: 'が', romaji: 'ga', meaningBn: '"গা" ধ্বনি', meaningEn: 'Sound "ga"', exampleWord: 'がっこう (gakkou)', exampleWordKana: 'がっこう', exampleMeaningBn: 'স্কুল', exampleMeaningEn: 'School' },
    { kana: 'ぎ', romaji: 'gi', meaningBn: '"গি" ধ্বনি', meaningEn: 'Sound "gi"', exampleWord: 'ぎんこう (ginkou)', exampleWordKana: 'ぎんこう', exampleMeaningBn: 'ব্যাংক', exampleMeaningEn: 'Bank' },
    { kana: 'ぐ', romaji: 'gu', meaningBn: '"গু" ধ্বনি', meaningEn: 'Sound "gu"', exampleWord: 'ぐんたい (guntai)', exampleWordKana: 'ぐんたい', exampleMeaningBn: 'সেনাবাহিনী', exampleMeaningEn: 'Army' },
    { kana: 'げ', romaji: 'ge', meaningBn: '"গে" ধ্বনি', meaningEn: 'Sound "ge"', exampleWord: 'げんき (genki)', exampleWordKana: 'げんき', exampleMeaningBn: 'সুস্থ / প্রাণবন্ত', exampleMeaningEn: 'Healthy / Energetic' },
    { kana: 'ご', romaji: 'go', meaningBn: '"গো" ধ্বনি', meaningEn: 'Sound "go"', exampleWord: 'ごはん (gohan)', exampleWordKana: 'ごはん', exampleMeaningBn: 'ভাত / খাবার', exampleMeaningEn: 'Rice / Meal' },

    { kana: 'ざ', romaji: 'za', meaningBn: '"জা" ধ্বনি', meaningEn: 'Sound "za"', exampleWord: 'ざっし (zasshi)', exampleWordKana: 'ざっし', exampleMeaningBn: 'ম্যাগাজিন', exampleMeaningEn: 'Magazine' },
    { kana: 'じ', romaji: 'ji', meaningBn: '"জি" ধ্বনি', meaningEn: 'Sound "ji"', exampleWord: 'じかん (jikan)', exampleWordKana: 'じかん', exampleMeaningBn: 'সময়', exampleMeaningEn: 'Time' },
    { kana: 'ず', romaji: 'zu', meaningBn: '"জু" ধ্বনি', meaningEn: 'Sound "zu"', exampleWord: 'みず (mizu)', exampleWordKana: 'みず', exampleMeaningBn: 'পানি', exampleMeaningEn: 'Water' },
    { kana: 'ぜ', romaji: 'ze', meaningBn: '"জে" ধ্বনি', meaningEn: 'Sound "ze"', exampleWord: 'ぜんぶ (zenbu)', exampleWordKana: 'ぜんぶ', exampleMeaningBn: 'সবকিছু', exampleMeaningEn: 'All / Everything' },
    { kana: 'ぞ', romaji: 'zo', meaningBn: '"জো" ধ্বনি', meaningEn: 'Sound "zo"', exampleWord: 'ぞう (zou)', exampleWordKana: 'ぞう', exampleMeaningBn: 'হাতি', exampleMeaningEn: 'Elephant' },

    { kana: 'だ', romaji: 'da', meaningBn: '"দা" ধ্বনি', meaningEn: 'Sound "da"', exampleWord: 'だいがく (daigaku)', exampleWordKana: 'だいがく', exampleMeaningBn: 'বিশ্ববিদ্যালয়', exampleMeaningEn: 'University' },
    { kana: 'ぢ', romaji: 'ji', meaningBn: '"জি" ধ্বনি', meaningEn: 'Sound "ji (dji)"', exampleWord: 'はなぢ (hanaji)', exampleWordKana: 'はなぢ', exampleMeaningBn: 'নাক দিয়ে রক্ত পড়া', exampleMeaningEn: 'Nosebleed' },
    { kana: 'づ', romaji: 'dzu', meaningBn: '"জু" ধ্বনি', meaningEn: 'Sound "dzu"', exampleWord: 'つづく (tsudzuku)', exampleWordKana: 'つづく', exampleMeaningBn: 'চলমান থাকা', exampleMeaningEn: 'To continue' },
    { kana: 'で', romaji: 'de', meaningBn: '"দে" ধ্বনি', meaningEn: 'Sound "de"', exampleWord: 'でんしゃ (densha)', exampleWordKana: 'でんしゃ', exampleMeaningBn: 'রেলগাড়ি', exampleMeaningEn: 'Train' },
    { kana: 'ど', romaji: 'do', meaningBn: '"দো" ধ্বনি', meaningEn: 'Sound "do"', exampleWord: 'どこ (doko)', exampleWordKana: 'どこ', exampleMeaningBn: 'কোথায়', exampleMeaningEn: 'Where' },

    { kana: 'ば', romaji: 'ba', meaningBn: '"বা" ধ্বনি', meaningEn: 'Sound "ba"', exampleWord: 'ばんごう (bangou)', exampleWordKana: 'ばんごう', exampleMeaningBn: 'নম্বর', exampleMeaningEn: 'Number' },
    { kana: 'び', romaji: 'bi', meaningBn: '"বি" ধ্বনি', meaningEn: 'Sound "bi"', exampleWord: 'びょういん (byouin)', exampleWordKana: 'びょういん', exampleMeaningBn: 'হাসপাতাল', exampleMeaningEn: 'Hospital' },
    { kana: 'ぶ', romaji: 'bu', meaningBn: '"বু" ধ্বনি', meaningEn: 'Sound "bu"', exampleWord: 'ぶんか (bunka)', exampleWordKana: 'ぶんか', exampleMeaningBn: 'সংস্কৃতি', exampleMeaningEn: 'Culture' },
    { kana: 'べ', romaji: 'be', meaningBn: '"বে" ধ্বনি', meaningEn: 'Sound "be"', exampleWord: 'べんきょう (benkyou)', exampleWordKana: 'べんきょう', exampleMeaningBn: 'পড়াশোনা', exampleMeaningEn: 'Study' },
    { kana: 'ぼ', romaji: 'bo', meaningBn: '"বো" ধ্বনি', meaningEn: 'Sound "bo"', exampleWord: 'ぼうえき (boueki)', exampleWordKana: 'ぼうえき', exampleMeaningBn: 'বাণিজ্য', exampleMeaningEn: 'Trade' },

    // Handakuten
    { kana: 'ぱ', romaji: 'pa', meaningBn: '"পা" ধ্বনি', meaningEn: 'Sound "pa"', exampleWord: 'パン (pan)', exampleWordKana: 'パン', exampleMeaningBn: 'পাউরুটি', exampleMeaningEn: 'Bread' },
    { kana: 'ぴ', romaji: 'pi', meaningBn: '"পি" ধ্বনি', meaningEn: 'Sound "pi"', exampleWord: 'ぴかぴか (pikapika)', exampleWordKana: 'ぴかぴか', exampleMeaningBn: 'চকচকে', exampleMeaningEn: 'Sparkling' },
    { kana: 'ぷ', romaji: 'pu', meaningBn: '"পু" ধ্বনি', meaningEn: 'Sound "pu"', exampleWord: 'プール (puuru)', exampleWordKana: 'プール', exampleMeaningBn: 'সুইমিং পুল', exampleMeaningEn: 'Swimming pool' },
    { kana: 'ぺ', romaji: 'pe', meaningBn: '"পে" ধ্বনি', meaningEn: 'Sound "pe"', exampleWord: 'ペン (pen)', exampleWordKana: 'ペン', exampleMeaningBn: 'কলম', exampleMeaningEn: 'Pen' },
    { kana: 'ぽ', romaji: 'po', meaningBn: '"পো" ধ্বনি', meaningEn: 'Sound "po"', exampleWord: 'ポスト (posuto)', exampleWordKana: 'ポスト', exampleMeaningBn: 'পোস্ট বক্স', exampleMeaningEn: 'Mailbox' },
  ];

  for (const char of hiraganaDakuten) {
    await prisma.character.create({
      data: {
        type: 'hiragana',
        category: char.romaji.startsWith('p') ? 'handakuten' : 'dakuten',
        kana: char.kana,
        romaji: char.romaji,
        meaningBn: char.meaningBn,
        meaningEn: char.meaningEn,
        exampleWord: char.exampleWord,
        exampleWordKana: char.exampleWordKana,
        exampleMeaningBn: char.exampleMeaningBn,
        exampleMeaningEn: char.exampleMeaningEn,
        order: order++,
      }
    });
  }

  // Katakana Basic 46
  const katakanaBasic = [
    { kana: 'ア', romaji: 'a', meaningBn: 'কাতাকানা "আ"', meaningEn: 'Vowel "a"', exampleWord: 'アイス (aisu)', exampleWordKana: 'アイス', exampleMeaningBn: 'আইসক্রিম', exampleMeaningEn: 'Ice cream' },
    { kana: 'イ', romaji: 'i', meaningBn: 'কাতাকানা "ই"', meaningEn: 'Vowel "i"', exampleWord: 'インド (indo)', exampleWordKana: 'インド', exampleMeaningBn: 'ভারত', exampleMeaningEn: 'India' },
    { kana: 'ウ', romaji: 'u', meaningBn: 'কাতাকানা "উ"', meaningEn: 'Vowel "u"', exampleWord: 'ウェブ (webu)', exampleWordKana: 'ウェブ', exampleMeaningBn: 'ওয়েব', exampleMeaningEn: 'Web' },
    { kana: 'エ', romaji: 'e', meaningBn: 'কাতাকানা "এ"', meaningEn: 'Vowel "e"', exampleWord: 'エアコン (eakon)', exampleWordKana: 'エアコン', exampleMeaningBn: 'এয়ার কন্ডিশনার', exampleMeaningEn: 'Air conditioner' },
    { kana: 'オ', romaji: 'o', meaningBn: 'কাতাকানা "ও"', meaningEn: 'Vowel "o"', exampleWord: 'オレンジ (orenji)', exampleWordKana: 'オレンジ', exampleMeaningBn: 'কমলা', exampleMeaningEn: 'Orange' },

    { kana: 'カ', romaji: 'ka', meaningBn: 'কাতাকানা "কা"', meaningEn: 'Sound "ka"', exampleWord: 'カメラ (kamera)', exampleWordKana: 'カメラ', exampleMeaningBn: 'ক্যামেরা', exampleMeaningEn: 'Camera' },
    { kana: 'キ', romaji: 'ki', meaningBn: 'কাতাকানা "কি"', meaningEn: 'Sound "ki"', exampleWord: 'キロ (kiro)', exampleWordKana: 'キロ', exampleMeaningBn: 'কিলো', exampleMeaningEn: 'Kilo' },
    { kana: 'ク', romaji: 'ku', meaningBn: 'কাতাকানা "কু"', meaningEn: 'Sound "ku"', exampleWord: 'クラス (kurasu)', exampleWordKana: 'クラス', exampleMeaningBn: 'ক্লাস / শ্রেণি', exampleMeaningEn: 'Class' },
    { kana: 'ケ', romaji: 'ke', meaningBn: 'কাতাকানা "কে"', meaningEn: 'Sound "ke"', exampleWord: 'ケーキ (keeki)', exampleWordKana: 'ケーキ', exampleMeaningBn: 'কেক', exampleMeaningEn: 'Cake' },
    { kana: 'コ', romaji: 'ko', meaningBn: 'কাতাকানা "কো"', meaningEn: 'Sound "ko"', exampleWord: 'コーヒー (koohii)', exampleWordKana: 'コーヒー', exampleMeaningBn: 'কফি', exampleMeaningEn: 'Coffee' },

    { kana: 'サ', romaji: 'sa', meaningBn: 'কাতাকানা "সা"', meaningEn: 'Sound "sa"', exampleWord: 'サラダ (sarada)', exampleWordKana: 'サラダ', exampleMeaningBn: 'সালাদ', exampleMeaningEn: 'Salad' },
    { kana: 'シ', romaji: 'shi', meaningBn: 'কাতাকানা "শি"', meaningEn: 'Sound "shi"', exampleWord: 'シャツ (shatsu)', exampleWordKana: 'シャツ', exampleMeaningBn: 'শার্ট', exampleMeaningEn: 'Shirt' },
    { kana: 'ス', romaji: 'su', meaningBn: 'কাতাকানা "সু"', meaningEn: 'Sound "su"', exampleWord: 'スポーツ (supootsu)', exampleWordKana: 'スポーツ', exampleMeaningBn: 'খেলাধুলা', exampleMeaningEn: 'Sports' },
    { kana: 'セ', romaji: 'se', meaningBn: 'কাতাকানা "সে"', meaningEn: 'Sound "se"', exampleWord: 'センター (sentaa)', exampleWordKana: 'センター', exampleMeaningBn: 'কেন্দ্র / সেন্টার', exampleMeaningEn: 'Center' },
    { kana: 'ソ', romaji: 'so', meaningBn: 'কাতাকানা "সো"', meaningEn: 'Sound "so"', exampleWord: 'ソファ (sofa)', exampleWordKana: 'ソファ', exampleMeaningBn: 'সোফা', exampleMeaningEn: 'Sofa' },

    { kana: 'タ', romaji: 'ta', meaningBn: 'কাতাকানা "তা"', meaningEn: 'Sound "ta"', exampleWord: 'タクシー (takushii)', exampleWordKana: 'タクシー', exampleMeaningBn: 'ট্যাক্সি', exampleMeaningEn: 'Taxi' },
    { kana: 'チ', romaji: 'chi', meaningBn: 'কাতাকানা "চি"', meaningEn: 'Sound "chi"', exampleWord: 'チーズ (chiizu)', exampleWordKana: 'チーズ', exampleMeaningBn: 'পনির / চিজ', exampleMeaningEn: 'Cheese' },
    { kana: 'ツ', romaji: 'tsu', meaningBn: 'কাতাকানা "ৎসু"', meaningEn: 'Sound "tsu"', exampleWord: 'ツアー (tsuaa)', exampleWordKana: 'ツアー', exampleMeaningBn: 'ভ্রমণ / ট্যুর', exampleMeaningEn: 'Tour' },
    { kana: 'テ', romaji: 'te', meaningBn: 'কাতাকানা "তে"', meaningEn: 'Sound "te"', exampleWord: 'テレビ (terebi)', exampleWordKana: 'テレビ', exampleMeaningBn: 'টেলিভিশন', exampleMeaningEn: 'Television' },
    { kana: 'ト', romaji: 'to', meaningBn: 'কাতাকানা "তো"', meaningEn: 'Sound "to"', exampleWord: 'トイレ (toire)', exampleWordKana: 'トイレ', exampleMeaningBn: 'টয়লেট', exampleMeaningEn: 'Toilet / Restroom' },

    { kana: 'ナ', romaji: 'na', meaningBn: 'কাতাকানা "না"', meaningEn: 'Sound "na"', exampleWord: 'ナイフ (naifu)', exampleWordKana: 'ナイフ', exampleMeaningBn: 'ছুরি', exampleMeaningEn: 'Knife' },
    { kana: 'ニ', romaji: 'ni', meaningBn: 'কাতাকানা "নি"', meaningEn: 'Sound "ni"', exampleWord: 'ニュース (nyuusu)', exampleWordKana: 'ニュース', exampleMeaningBn: 'সংবাদ', exampleMeaningEn: 'News' },
    { kana: 'ヌ', romaji: 'nu', meaningBn: 'কাতাকানা "নু"', meaningEn: 'Sound "nu"', exampleWord: 'ヌードル (nuudoru)', exampleWordKana: 'ヌードル', exampleMeaningBn: 'নুডুলস', exampleMeaningEn: 'Noodles' },
    { kana: 'ネ', romaji: 'ne', meaningBn: 'কাতাকানা "নে"', meaningEn: 'Sound "ne"', exampleWord: 'ネクタイ (nekutai)', exampleWordKana: 'ネクタイ', exampleMeaningBn: 'নেকটাই', exampleMeaningEn: 'Necktie' },
    { kana: 'ノ', romaji: 'no', meaningBn: 'কাতাকানা "নো"', meaningEn: 'Sound "no"', exampleWord: 'ノート (nooto)', exampleWordKana: 'ノート', exampleMeaningBn: 'নোটবুক', exampleMeaningEn: 'Notebook' },

    { kana: 'ハ', romaji: 'ha', meaningBn: 'কাতাকানা "হা"', meaningEn: 'Sound "ha"', exampleWord: 'ハンバーガー (hanbaagaa)', exampleWordKana: 'ハンバーガー', exampleMeaningBn: 'বার্গার', exampleMeaningEn: 'Burger' },
    { kana: 'ヒ', romaji: 'hi', meaningBn: 'কাতাকানা "হি"', meaningEn: 'Sound "hi"', exampleWord: 'ヒーター (hiitaa)', exampleWordKana: 'ヒーター', exampleMeaningBn: 'হিটার', exampleMeaningEn: 'Heater' },
    { kana: 'フ', romaji: 'fu', meaningBn: 'কাতাকানা "ফু"', meaningEn: 'Sound "fu"', exampleWord: 'フォーク (fooku)', exampleWordKana: 'フォーク', exampleMeaningBn: 'কাঁটাচামচ', exampleMeaningEn: 'Fork' },
    { kana: 'ヘ', romaji: 'he', meaningBn: 'কাতাকানা "হে"', meaningEn: 'Sound "he"', exampleWord: 'ヘリコプター (herikoputaa)', exampleWordKana: 'ヘリコプター', exampleMeaningBn: 'হেলিকপ্টার', exampleMeaningEn: 'Helicopter' },
    { kana: 'ホ', romaji: 'ho', meaningBn: 'কাতাকানা "হো"', meaningEn: 'Sound "ho"', exampleWord: 'ホテル (hoteru)', exampleWordKana: 'ホテル', exampleMeaningBn: 'হোটেল', exampleMeaningEn: 'Hotel' },

    { kana: 'マ', romaji: 'ma', meaningBn: 'কাতাকানা "মা"', meaningEn: 'Sound "ma"', exampleWord: 'マスク (masuku)', exampleWordKana: 'マスク', exampleMeaningBn: 'মাস্ক', exampleMeaningEn: 'Mask' },
    { kana: 'ミ', romaji: 'mi', meaningBn: 'কাতাকানা "মি"', meaningEn: 'Sound "mi"', exampleWord: 'ミルク (miruku)', exampleWordKana: 'ミルク', exampleMeaningBn: 'দুধ', exampleMeaningEn: 'Milk' },
    { kana: 'ム', romaji: 'mu', meaningBn: 'কাতাকানা "মু"', meaningEn: 'Sound "mu"', exampleWord: 'ムービー (muubii)', exampleWordKana: 'ムービー', exampleMeaningBn: 'চলচ্চিত্র', exampleMeaningEn: 'Movie' },
    { kana: 'メ', romaji: 'me', meaningBn: 'কাতাকানা "মে"', meaningEn: 'Sound "me"', exampleWord: 'メニュー (menyuu)', exampleWordKana: 'メニュー', exampleMeaningBn: 'মেন্যু', exampleMeaningEn: 'Menu' },
    { kana: 'モ', romaji: 'mo', meaningBn: 'কাতাকানা "মো"', meaningEn: 'Sound "mo"', exampleWord: 'モデル (moderu)', exampleWordKana: 'モデル', exampleMeaningBn: 'মডেল', exampleMeaningEn: 'Model' },

    { kana: 'ヤ', romaji: 'ya', meaningBn: 'কাতাকানা "ইয়া"', meaningEn: 'Sound "ya"', exampleWord: 'ヤード (yaado)', exampleWordKana: 'ヤード', exampleMeaningBn: 'ইয়ার্ড', exampleMeaningEn: 'Yard' },
    { kana: 'ユ', romaji: 'yu', meaningBn: 'কাতাকানা "ইউ"', meaningEn: 'Sound "yu"', exampleWord: 'ユーモア (yuumoa)', exampleWordKana: 'ユーモア', exampleMeaningBn: 'রসবোধ', exampleMeaningEn: 'Humor' },
    { kana: 'ヨ', romaji: 'yo', meaningBn: 'কাতাকানা "ইয়ো"', meaningEn: 'Sound "yo"', exampleWord: 'ヨーグルト (yooguruto)', exampleWordKana: 'ヨーグルト', exampleMeaningBn: 'দই', exampleMeaningEn: 'Yogurt' },

    { kana: 'ラ', romaji: 'ra', meaningBn: 'কাতাকানা "রা"', meaningEn: 'Sound "ra"', exampleWord: 'ラジオ (rajio)', exampleWordKana: 'ラジオ', exampleMeaningBn: 'রেডিও', exampleMeaningEn: 'Radio' },
    { kana: 'リ', romaji: 'ri', meaningBn: 'কাতাকানা "রি"', meaningEn: 'Sound "ri"', exampleWord: 'リーダー (riidaa)', exampleWordKana: 'リーダー', exampleMeaningBn: 'দলনেতা', exampleMeaningEn: 'Leader' },
    { kana: 'ル', romaji: 'ru', meaningBn: 'কাতাকানা "রু"', meaningEn: 'Sound "ru"', exampleWord: 'ルール (ruuru)', exampleWordKana: 'ルール', exampleMeaningBn: 'নিয়মকানুন', exampleMeaningEn: 'Rule' },
    { kana: 'レ', romaji: 're', meaningBn: 'কাতাকানা "রে"', meaningEn: 'Sound "re"', exampleWord: 'レモン (remon)', exampleWordKana: 'レモン', exampleMeaningBn: 'লেবু', exampleMeaningEn: 'Lemon' },
    { kana: 'ロ', romaji: 'ro', meaningBn: 'কাতাকানা "রো"', meaningEn: 'Sound "ro"', exampleWord: 'ロボット (robotto)', exampleWordKana: 'ロボット', exampleMeaningBn: 'রোবট', exampleMeaningEn: 'Robot' },

    { kana: 'ワ', romaji: 'wa', meaningBn: 'কাতাকানা "ওয়া"', meaningEn: 'Sound "wa"', exampleWord: 'ワイシャツ (waishatsu)', exampleWordKana: 'ワイシャツ', exampleMeaningBn: 'হোয়াইট শার্ট', exampleMeaningEn: 'White shirt' },
    { kana: 'ヲ', romaji: 'wo', meaningBn: 'কাতাকানা "ও"', meaningEn: 'Sound "wo"', exampleWord: 'ヲ', exampleWordKana: 'ヲ', exampleMeaningBn: 'পার্টিকেল', exampleMeaningEn: 'Particle' },
    { kana: 'ン', romaji: 'n', meaningBn: 'কাতাকানা "ন"', meaningEn: 'Nasal "n"', exampleWord: 'パン (pan)', exampleWordKana: 'パン', exampleMeaningBn: 'পাউরুটি', exampleMeaningEn: 'Bread' },
  ];

  let kOrder = 1;
  for (const char of katakanaBasic) {
    await prisma.character.create({
      data: {
        type: 'katakana',
        category: 'basic',
        kana: char.kana,
        romaji: char.romaji,
        meaningBn: char.meaningBn,
        meaningEn: char.meaningEn,
        exampleWord: char.exampleWord,
        exampleWordKana: char.exampleWordKana,
        exampleMeaningBn: char.exampleMeaningBn,
        exampleMeaningEn: char.exampleMeaningEn,
        order: kOrder++,
      }
    });
  }

  // Katakana Dakuten & Handakuten
  const katakanaDakuten = [
    { kana: 'ガ', romaji: 'ga', meaningBn: 'কাতাকানা "গা"', meaningEn: 'Sound "ga"', exampleWord: 'ガス (gasu)', exampleWordKana: 'ガス', exampleMeaningBn: 'গ্যাস', exampleMeaningEn: 'Gas' },
    { kana: 'ギ', romaji: 'gi', meaningBn: 'কাতাকানা "গি"', meaningEn: 'Sound "gi"', exampleWord: 'ギター (gitaa)', exampleWordKana: 'ギター', exampleMeaningBn: 'গিটার', exampleMeaningEn: 'Guitar' },
    { kana: 'グ', romaji: 'gu', meaningBn: 'কাতাকানা "গু"', meaningEn: 'Sound "gu"', exampleWord: 'グラス (gurasu)', exampleWordKana: 'グラス', exampleMeaningBn: 'গ্লাস', exampleMeaningEn: 'Glass' },
    { kana: 'ゲ', romaji: 'ge', meaningBn: 'কাতাকানা "গে"', meaningEn: 'Sound "ge"', exampleWord: 'ゲーム (geemu)', exampleWordKana: 'ゲーム', exampleMeaningBn: 'ভিডিও গেম', exampleMeaningEn: 'Game' },
    { kana: 'ゴ', romaji: 'go', meaningBn: 'কাতাকানা "গো"', meaningEn: 'Sound "go"', exampleWord: 'ゴルフ (gorufu)', exampleWordKana: 'ゴルフ', exampleMeaningBn: 'গলফ খেলা', exampleMeaningEn: 'Golf' },

    { kana: 'ザ', romaji: 'za', meaningBn: 'কাতাকানা "জা"', meaningEn: 'Sound "za"', exampleWord: 'サイズ (saizu)', exampleWordKana: 'サイズ', exampleMeaningBn: 'আকার / সাইজ', exampleMeaningEn: 'Size' },
    { kana: 'ジ', romaji: 'ji', meaningBn: 'কাতাকানা "জি"', meaningEn: 'Sound "ji"', exampleWord: 'ジュース (juusu)', exampleWordKana: 'ジュース', exampleMeaningBn: 'জুস', exampleMeaningEn: 'Juice' },
    { kana: 'ズ', romaji: 'zu', meaningBn: 'কাতাকানা "জু"', meaningEn: 'Sound "zu"', exampleWord: 'ズボン (zubon)', exampleWordKana: 'ズボン', exampleMeaningBn: 'প্যান্ট', exampleMeaningEn: 'Trousers' },
    { kana: 'ゼ', romaji: 'ze', meaningBn: 'কাতাকানা "জে"', meaningEn: 'Sound "ze"', exampleWord: 'ゼロ (zero)', exampleWordKana: 'ゼロ', exampleMeaningBn: 'শূন্য', exampleMeaningEn: 'Zero' },
    { kana: 'ゾ', romaji: 'zo', meaningBn: 'কাতাকানা "জো"', meaningEn: 'Sound "zo"', exampleWord: 'ゾーン (zoon)', exampleWordKana: 'ゾーン', exampleMeaningBn: 'এলাকা / জোন', exampleMeaningEn: 'Zone' },

    { kana: 'ダ', romaji: 'da', meaningBn: 'কাতাকানা "দা"', meaningEn: 'Sound "da"', exampleWord: 'ダンス (dansu)', exampleWordKana: 'ダンス', exampleMeaningBn: 'নাচ', exampleMeaningEn: 'Dance' },
    { kana: 'ヂ', romaji: 'ji', meaningBn: 'কাতাকানা "জি"', meaningEn: 'Sound "ji"', exampleWord: 'ヂ', exampleWordKana: 'ヂ', exampleMeaningBn: 'বিশেষ ধ্বনি', exampleMeaningEn: 'Special ji' },
    { kana: 'ヅ', romaji: 'dzu', meaningBn: 'কাতাকানা "জু"', meaningEn: 'Sound "dzu"', exampleWord: 'ヅ', exampleWordKana: 'ヅ', exampleMeaningBn: 'বিশেষ ধ্বনি', exampleMeaningEn: 'Special dzu' },
    { kana: 'デ', romaji: 'de', meaningBn: 'কাতাকানা "দে"', meaningEn: 'Sound "de"', exampleWord: 'デザイン (dezain)', exampleWordKana: 'デザイン', exampleMeaningBn: 'ডিজাইন', exampleMeaningEn: 'Design' },
    { kana: 'ド', romaji: 'do', meaningBn: 'কাতাকানা "দো"', meaningEn: 'Sound "do"', exampleWord: 'ドア (doa)', exampleWordKana: 'ドア', exampleMeaningBn: 'দরজা', exampleMeaningEn: 'Door' },

    { kana: 'バ', romaji: 'ba', meaningBn: 'কাতাকানা "বা"', meaningEn: 'Sound "ba"', exampleWord: 'バス (basu)', exampleWordKana: 'バス', exampleMeaningBn: 'বাস গাড়ি', exampleMeaningEn: 'Bus' },
    { kana: 'ビ', romaji: 'bi', meaningBn: 'কাতাকানা "বি"', meaningEn: 'Sound "bi"', exampleWord: 'ビール (biiru)', exampleWordKana: 'ビール', exampleMeaningBn: 'বিয়ার', exampleMeaningEn: 'Beer' },
    { kana: 'ブ', romaji: 'bu', meaningBn: 'কাতাকানা "বু"', meaningEn: 'Sound "bu"', exampleWord: 'ベッド (beddo)', exampleWordKana: 'ベッド', exampleMeaningBn: 'বিছানা', exampleMeaningEn: 'Bed' },
    { kana: 'ベ', romaji: 'be', meaningBn: 'কাতাকানা "বে"', meaningEn: 'Sound "be"', exampleWord: 'ベルト (beruto)', exampleWordKana: 'ベルト', exampleMeaningBn: 'বেল্ট', exampleMeaningEn: 'Belt' },
    { kana: 'ボ', romaji: 'bo', meaningBn: 'কাতাকানা "বো"', meaningEn: 'Sound "bo"', exampleWord: 'ボール (booru)', exampleWordKana: 'ボール', exampleMeaningBn: 'বল', exampleMeaningEn: 'Ball' },

    { kana: 'パ', romaji: 'pa', meaningBn: 'কাতাকানা "পা"', meaningEn: 'Sound "pa"', exampleWord: 'ピアノ (piano)', exampleWordKana: 'ピアノ', exampleMeaningBn: 'পিয়ানো', exampleMeaningEn: 'Piano' },
    { kana: 'ピ', romaji: 'pi', meaningBn: 'কাতাকানা "পি"', meaningEn: 'Sound "pi"', exampleWord: 'ピザ (piza)', exampleWordKana: 'ピザ', exampleMeaningBn: 'পিজ্জা', exampleMeaningEn: 'Pizza' },
    { kana: 'プ', romaji: 'pu', meaningBn: 'কাতাকানা "পু"', meaningEn: 'Sound "pu"', exampleWord: 'プレゼント (purezento)', exampleWordKana: 'プレゼント', exampleMeaningBn: 'উপহার', exampleMeaningEn: 'Present / Gift' },
    { kana: 'ペ', romaji: 'pe', meaningBn: 'কাতাকানা "পে"', meaningEn: 'Sound "pe"', exampleWord: 'ページ (peeji)', exampleWordKana: 'ページ', exampleMeaningBn: 'পৃষ্ঠা', exampleMeaningEn: 'Page' },
    { kana: 'ポ', romaji: 'po', meaningBn: 'কাতাকানা "পো"', meaningEn: 'Sound "po"', exampleWord: 'ポケット (poketto)', exampleWordKana: 'ポケット', exampleMeaningBn: 'পকেট', exampleMeaningEn: 'Pocket' },
  ];

  for (const char of katakanaDakuten) {
    await prisma.character.create({
      data: {
        type: 'katakana',
        category: char.romaji.startsWith('p') ? 'handakuten' : 'dakuten',
        kana: char.kana,
        romaji: char.romaji,
        meaningBn: char.meaningBn,
        meaningEn: char.meaningEn,
        exampleWord: char.exampleWord,
        exampleWordKana: char.exampleWordKana,
        exampleMeaningBn: char.exampleMeaningBn,
        exampleMeaningEn: char.exampleMeaningEn,
        order: kOrder++,
      }
    });
  }
  console.log('✓ Hiragana & Katakana seeded');

  // 4. Kanji (N5, N4, N3)
  const kanjiData = [
    // N5 Kanji
    {
      character: '日',
      jlptLevel: 'N5',
      strokeCount: 4,
      onyomi: 'ニチ, ジツ',
      kunyomi: 'ひ, -び, -か',
      furigana: 'ひ',
      meaningEn: 'Day, Sun, Japan',
      meaningBn: 'দিন, সূর্য, জাপান',
      meaningJa: 'ひ、たいよう、にち',
      exampleWords: JSON.stringify([
        { word: '日曜日', furigana: 'にちようび', romaji: 'nichiyoubi', meaningEn: 'Sunday', meaningBn: 'রবিবার' },
        { word: '日本', furigana: 'にほん', romaji: 'nihon', meaningEn: 'Japan', meaningBn: 'জাপান' },
        { word: '毎日', furigana: 'まいにち', romaji: 'mainichi', meaningEn: 'Every day', meaningBn: 'প্রতিদিন' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'きょう は いい ひ です。', furigana: 'きょう は いい ひ です。', translationEn: 'Today is a good day.', translationBn: 'আজকের দিনটি চমৎকার।' }
      ]),
      order: 1
    },
    {
      character: '本',
      jlptLevel: 'N5',
      strokeCount: 5,
      onyomi: 'ホン',
      kunyomi: 'もと',
      furigana: 'ほん',
      meaningEn: 'Book, Origin, Real',
      meaningBn: 'বই, উৎস, মূল',
      meaningJa: 'ほん、もと',
      exampleWords: JSON.stringify([
        { word: '本棚', furigana: 'ほんだな', romaji: 'hondana', meaningEn: 'Bookshelf', meaningBn: 'বইয়ের তাক' },
        { word: '日本語', furigana: 'にほんご', romaji: 'nihongo', meaningEn: 'Japanese language', meaningBn: 'জাপানি ভাষা' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'わたし は ほん を よみます。', furigana: 'わたし は ほん を よみます。', translationEn: 'I read books.', translationBn: 'আমি বই পড়ি।' }
      ]),
      order: 2
    },
    {
      character: '人',
      jlptLevel: 'N5',
      strokeCount: 2,
      onyomi: 'ジン, ニン',
      kunyomi: 'ひと',
      furigana: 'ひと',
      meaningEn: 'Person, Human',
      meaningBn: 'মানুষ, ব্যক্তি',
      meaningJa: 'ひと、じん、にん',
      exampleWords: JSON.stringify([
        { word: '日本人', furigana: 'にほんじん', romaji: 'nihonjin', meaningEn: 'Japanese person', meaningBn: 'জাপানি নাগরিক' },
        { word: '外国人', furigana: 'がいこくじん', romaji: 'gaikokujin', meaningEn: 'Foreigner', meaningBn: 'বিদেশি নাগরিক' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'あの ひと は たなかさん です。', furigana: 'あの ひと は たなかさん です。', translationEn: 'That person is Mr. Tanaka.', translationBn: 'ওই ব্যক্তি হলেন তানাকা সাহেব।' }
      ]),
      order: 3
    },
    {
      character: '月',
      jlptLevel: 'N5',
      strokeCount: 4,
      onyomi: 'ゲツ, ガツ',
      kunyomi: 'つき',
      furigana: 'つき',
      meaningEn: 'Moon, Month',
      meaningBn: 'চাঁদ, মাস',
      meaningJa: 'つき、げつ、がつ',
      exampleWords: JSON.stringify([
        { word: '月曜日', furigana: 'げつようび', romaji: 'getsuyoubi', meaningEn: 'Monday', meaningBn: 'সোমবার' },
        { word: '今月', furigana: 'こんげつ', romaji: 'kongetsu', meaningEn: 'This month', meaningBn: 'চলতি মাস' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'こんばん は つき が きれい です。', furigana: 'こんばん は つき が きれい です。', translationEn: 'The moon is beautiful tonight.', translationBn: 'আজ রাতে চাঁদটি অপূর্ব সুন্দর।' }
      ]),
      order: 4
    },
    {
      character: '学',
      jlptLevel: 'N5',
      strokeCount: 8,
      onyomi: 'ガク',
      kunyomi: 'まな・ぶ',
      furigana: 'がく',
      meaningEn: 'Study, Learning, Science',
      meaningBn: 'শেখা, অধ্যয়ন, বিজ্ঞান',
      meaningJa: 'まなぶ、がく',
      exampleWords: JSON.stringify([
        { word: '学生', furigana: 'がくせい', romaji: 'gakusei', meaningEn: 'Student', meaningBn: 'শিক্ষার্থী / ছাত্র' },
        { word: '大学', furigana: 'だいがく', romaji: 'daigaku', meaningEn: 'University', meaningBn: 'বিশ্ববিদ্যালয়' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'わたし は にほんご を まなびます。', furigana: 'わたし は にほんご を まなびます。', translationEn: 'I learn Japanese.', translationBn: 'আমি জাপানি ভাষা শিখি।' }
      ]),
      order: 5
    },
    {
      character: '校',
      jlptLevel: 'N5',
      strokeCount: 10,
      onyomi: 'コウ',
      kunyomi: '-',
      furigana: 'こう',
      meaningEn: 'School, Exam',
      meaningBn: 'বিদ্যালয়, স্কুল',
      meaningJa: 'こう',
      exampleWords: JSON.stringify([
        { word: '学校', furigana: 'がっこう', romaji: 'gakkou', meaningEn: 'School', meaningBn: 'স্কুল' },
        { word: '高校', furigana: 'こうこう', romaji: 'koukou', meaningEn: 'High school', meaningBn: 'উচ্চ বিদ্যালয়' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'まいにち がっこう へ いきます。', furigana: 'まいにち がっこう へ いきます。', translationEn: 'I go to school every day.', translationBn: 'আমি প্রতিদিন স্কুলে যাই।' }
      ]),
      order: 6
    },

    // N4 Kanji
    {
      character: '会',
      jlptLevel: 'N4',
      strokeCount: 6,
      onyomi: 'カイ, エ',
      kunyomi: 'あ・う',
      furigana: 'あう',
      meaningEn: 'Meeting, Meet, Society',
      meaningBn: 'দেখা করা, সভা, সম্মেলন',
      meaningJa: 'あう、かい',
      exampleWords: JSON.stringify([
        { word: '会社', furigana: 'かいしゃ', romaji: 'kaisha', meaningEn: 'Company / Corporation', meaningBn: 'কোম্পানি / প্রতিষ্ঠান' },
        { word: '会話', furigana: 'かいわ', romaji: 'kaiwa', meaningEn: 'Conversation', meaningBn: 'কথোপকথন' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'あした ともだち に あいます。', furigana: 'あした ともだち に あいます。', translationEn: 'I will meet a friend tomorrow.', translationBn: 'আগামীকাল আমি বন্ধুর সাথে দেখা করব।' }
      ]),
      order: 7
    },
    {
      character: '社',
      jlptLevel: 'N4',
      strokeCount: 7,
      onyomi: 'シャ',
      kunyomi: 'やしろ',
      furigana: 'しゃ',
      meaningEn: 'Company, Firm, Shrine',
      meaningBn: 'প্রতিষ্ঠান, সমাজ, তীর্থ',
      meaningJa: 'しゃ、やしろ',
      exampleWords: JSON.stringify([
        { word: '社員', furigana: 'しゃいん', romaji: 'shain', meaningEn: 'Company employee', meaningBn: 'কর্মচারী' },
        { word: '社会', furigana: 'しゃかい', romaji: 'shakai', meaningEn: 'Society', meaningBn: 'সমাজ' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'ちち は くるま の かいしゃ で はたらいて います。', furigana: 'ちち は くるま の かいしゃ で はたらいて います。', translationEn: 'My father works at a car company.', translationBn: 'আমার বাবা একটি গাড়ি কোম্পানিতে কাজ করেন।' }
      ]),
      order: 8
    },
    {
      character: '買',
      jlptLevel: 'N4',
      strokeCount: 12,
      onyomi: 'バイ',
      kunyomi: 'か・う',
      furigana: 'かう',
      meaningEn: 'Buy, Purchase',
      meaningBn: 'কেনা, ক্রয় করা',
      meaningJa: 'かう、ばい',
      exampleWords: JSON.stringify([
        { word: '買い物', furigana: 'かいもの', romaji: 'kaimono', meaningEn: 'Shopping', meaningBn: 'কেনাকাটা' },
        { word: '売買', furigana: 'ばいばい', romaji: 'baibai', meaningEn: 'Buying and selling', meaningBn: 'ক্রয়-বিক্রয়' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'あたらしい パソコン を かいました。', furigana: 'あたらしい パソコン を かいました。', translationEn: 'I bought a new computer.', translationBn: 'আমি একটি নতুন কম্পিউটার কিনেছি।' }
      ]),
      order: 9
    },

    // N3 Kanji
    {
      character: '経',
      jlptLevel: 'N3',
      strokeCount: 11,
      onyomi: 'ケイ, キョウ',
      kunyomi: 'へ・る, た・つ',
      furigana: 'けい',
      meaningEn: 'Pass through, Manage, Sutra',
      meaningBn: 'অতিক্রম করা, পরিচালনা করা, অর্থনীতি',
      meaningJa: 'へる、けい',
      exampleWords: JSON.stringify([
        { word: '経済', furigana: 'けいざい', romaji: 'keizai', meaningEn: 'Economy / Economics', meaningBn: 'অর্থনীতি' },
        { word: '経験', furigana: 'けいけん', romaji: 'keiken', meaningEn: 'Experience', meaningBn: 'অভিজ্ঞতা' },
        { word: '経営', furigana: 'けいえい', romaji: 'keiei', meaningEn: 'Management', meaningBn: 'ব্যবস্থাপনা' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'にほん で おおく の けいけん を つみたい です。', furigana: 'にほん で おおく の けいけん を つみたい です。', translationEn: 'I want to gain a lot of experience in Japan.', translationBn: 'আমি জাপানে প্রচুর অভিজ্ঞতা অর্জন করতে চাই।' }
      ]),
      order: 10
    },
    {
      character: '済',
      jlptLevel: 'N3',
      strokeCount: 11,
      onyomi: 'サイ, ザイ',
      kunyomi: 'す・む, す・ます',
      furigana: 'すむ',
      meaningEn: 'Finish, Settle, Relieve',
      meaningBn: 'সম্পন্ন হওয়া, পরিশোধ করা',
      meaningJa: 'すむ、すます、ざい',
      exampleWords: JSON.stringify([
        { word: '経済学', furigana: 'けいざいがく', romaji: 'keizaigaku', meaningEn: 'Economics study', meaningBn: 'অর্থশাস্ত্র' },
        { word: '返済', furigana: 'へんさい', romaji: 'hensai', meaningEn: 'Repayment', meaningBn: 'ঋণ পরিশোধ' }
      ]),
      exampleSentences: JSON.stringify([
        { sentence: 'じゅんび が もう すみました。', furigana: 'じゅんび が もう すみました。', translationEn: 'The preparation is already completed.', translationBn: 'প্রস্তুতি ইতোমধ্যে সম্পন্ন হয়েছে।' }
      ]),
      order: 11
    }
  ];

  for (const k of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: k.character },
      update: k,
      create: k,
    });
  }
  console.log('✓ Kanji seeded');

  // 5. Mock Tests & Questions (N5, N4, N3)
  const mockTests = [
    {
      jlptLevel: 'N5',
      title: 'JLPT N5 Standard Practice Examination (Batch 1)',
      titleBn: 'জেএলপিটি এন৫ আদর্শ অনুশীলন পরীক্ষা (সেট ১)',
      titleJa: 'JLPT N5 標準模擬試験（第1回）',
      description: 'Covers Vocabulary, Kanji Reading, Basic Grammar, and Reading Comprehension aligned with the official JLPT N5 question patterns.',
      descriptionBn: 'ভোকাবুলারি, কাঞ্জি উচ্চারণ, মৌলিক ব্যাকরণ ও পাঠ্যাংশ বোঝার পূর্ণাঙ্গ মক টেস্ট।',
      descriptionJa: '文字・語彙、文法、読解を網羅した本番レベルの模擬試験です。',
      timeLimitMinutes: 25,
      totalMarks: 100,
      passingScore: 60,
      questions: [
        {
          category: 'kanji',
          questionText: 'まいあさ ［新聞］ を よみます。［新聞］の かな は どれ ですか。',
          questionTextFurigana: 'まいあさ ［<ruby>新聞<rt>しんぶん</rt></ruby>］ を よみます。',
          marks: 10,
          explanation: '「新聞」は「しんぶん (shinbun)」と読みます。「新」＝新しい (atarashii)、「聞」＝聞く (kiku)。',
          explanationBn: '「新聞」শব্দটির সঠিক উচ্চারণ হলো「しんぶん (শিনবুন)」যার অর্থ খবরের কাগজ।',
          order: 1,
          options: [
            { label: '1', text: 'しんぶん', isCorrect: true },
            { label: '2', text: 'きんぶん', isCorrect: false },
            { label: '3', text: 'しんもん', isCorrect: false },
            { label: '4', text: 'きんもん', isCorrect: false },
          ]
        },
        {
          category: 'vocabulary',
          questionText: 'きのう デパート で きれいな ［くつ］ を かいました。［くつ］の かんじ は どれ ですか。',
          questionTextFurigana: 'きのう デパート で きれいな ［くつ］ を かいました。',
          marks: 10,
          explanation: 'くつ (kutsu / shoes) in Kanji is 靴.',
          explanationBn: 'জুতোর জাপানি শব্দ হলো くつ (কুতসু) যার কাঞ্জি 靴।',
          order: 2,
          options: [
            { label: '1', text: '靴', isCorrect: true },
            { label: '2', text: '服', isCorrect: false },
            { label: '3', text: '鞄', isCorrect: false },
            { label: '4', text: '傘', isCorrect: false },
          ]
        },
        {
          category: 'grammar',
          questionText: 'わたし は まいにち ７じ（　　）おきます。',
          questionTextFurigana: 'わたし は まいにち ７じ（　　）おきます。',
          marks: 10,
          explanation: 'Specific specific time points take particle に (ni).',
          explanationBn: 'নির্দিষ্ট সময়ের পরে পার্টিকেল に (নি) ব্যবহৃত হয়। যেমন: ৭টায় = ７じに।',
          order: 3,
          options: [
            { label: '1', text: 'で', isCorrect: false },
            { label: '2', text: 'に', isCorrect: true },
            { label: '3', text: 'を', isCorrect: false },
            { label: '4', text: 'へ', isCorrect: false },
          ]
        },
        {
          category: 'grammar',
          questionText: 'きのう としょかん で ともだち（　　）あいました。',
          questionTextFurigana: 'きのう としょかん で ともだち（　　）あいました。',
          marks: 10,
          explanation: 'Meeting a person (あう / 会う) takes particle に (ni).',
          explanationBn: 'কারো সাথে দেখা করার ক্ষেত্রে ব্যক্তিবাচক শব্দের পরে に (নি) বসে। যেমন: ともだちに あいました।',
          order: 4,
          options: [
            { label: '1', text: 'を', isCorrect: false },
            { label: '2', text: 'に', isCorrect: true },
            { label: '3', text: 'で', isCorrect: false },
            { label: '4', text: 'が', isCorrect: false },
          ]
        },
        {
          category: 'reading',
          passage: 'わたし の なまえ は ラキブ です。バングラデシュ から きました。いま とうきょう の にほんごがっこう で べんきょうして います。にほん の たべもの は おいしい ですが、すこし たかい です。まいしゅう にちようび に ともだち と サッカー を します。',
          questionText: 'ラキブさん は にちようび に なに を します か。',
          questionTextFurigana: 'ラキブさん は にちようび に なに を します か。',
          marks: 20,
          explanation: 'The passage says:「まいしゅう にちようび に ともだち と サッカー を します」= Plays soccer with friends.',
          explanationBn: 'প্যাসেজে বলা হয়েছে: "প্রতি রবিবার বন্ধুদের সাথে ফুটবল খেলি"।',
          order: 5,
          options: [
            { label: '1', text: 'にほんご を べんきょう します', isCorrect: false },
            { label: '2', text: 'ともだち と サッカー を します', isCorrect: true },
            { label: '3', text: 'バングラデシュ へ かえります', isCorrect: false },
            { label: '4', text: 'かいもの を します', isCorrect: false },
          ]
        }
      ]
    },
    {
      jlptLevel: 'N4',
      title: 'JLPT N4 Mid-Level Assessment Test (Batch 1)',
      titleBn: 'জেএলপিটি এন৪ মূল্যায়ন পরীক্ষা (সেট ১)',
      titleJa: 'JLPT N4 実力判定模擬試験（第1回）',
      description: 'Intermediate grammar, potential forms, passive/causative constructs, and real-life reading passages.',
      descriptionBn: 'পটেনশিয়াল ফর্ম, প্যাসিভ-কজেটিভ বাক্য ও বাস্তবিক পাঠ্যাংশের সমন্বয়ে এন৪ টেস্ট।',
      descriptionJa: '可能形・受身使役・条件表現を含むN4レベルの実戦形式試験。',
      timeLimitMinutes: 30,
      totalMarks: 100,
      passingScore: 60,
      questions: [
        {
          category: 'grammar',
          questionText: 'かんじ が おおすぎて、ぜんぜん（　　）。',
          questionTextFurigana: 'かんじ が おおすぎて、ぜんぜん（　　）。',
          marks: 10,
          explanation: '「ぜんぜん〜ない」 paired with potential form: 読めません (yomemasen / cannot read).',
          explanationBn: 'ぜんぜん এর সাথে সবসময় নেগেটিভ রূপ বসে। অনেক কাঞ্জি থাকায় পড়তে পারছি না = 読めません।',
          order: 1,
          options: [
            { label: '1', text: 'よみます', isCorrect: false },
            { label: '2', text: 'よめません', isCorrect: true },
            { label: '3', text: 'よみたいです', isCorrect: false },
            { label: '4', text: 'よみました', isCorrect: false },
          ]
        },
        {
          category: 'grammar',
          questionText: 'あめ が（　　）、しあわせ は ちゅうし に なります。',
          questionTextFurigana: 'あめ が（　　）、しあわせ は ちゅうし に なります。',
          marks: 10,
          explanation: 'Conditional form: ふったら (futtara / if it rains).',
          explanationBn: 'শর্তসূচক বাক্য: যদি বৃষ্টি হয় (あめが ふったら), খেলা বাতিল হবে।',
          order: 2,
          options: [
            { label: '1', text: 'ふれば', isCorrect: false },
            { label: '2', text: 'ふったら', isCorrect: true },
            { label: '3', text: 'ふるなら', isCorrect: false },
            { label: '4', text: 'ふると', isCorrect: false },
          ]
        }
      ]
    },
    {
      jlptLevel: 'N3',
      title: 'JLPT N3 Bridge to Business Practice Test',
      titleBn: 'জেএলপিটি এন৩ কর্পোরেট ও উচ্চশিক্ষা প্রস্তুতি টেস্ট',
      titleJa: 'JLPT N3 ビジネス・進学向け実戦模擬試験',
      description: 'Tests nuanced grammar patterns, Keigo distinctions, complex compound Kanji, and business communication comprehension.',
      descriptionBn: 'কেইগো, উন্নত যৌগিক কাঞ্জি ও ব্যবসায়িক জাপানি ভাষায় দক্ষতার প্রমাণ।',
      descriptionJa: '待遇表現、複文構造、論説文読解を問うN3実戦試験。',
      timeLimitMinutes: 35,
      totalMarks: 100,
      passingScore: 60,
      questions: [
        {
          category: 'grammar',
          questionText: 'せんせい の（　　）、しけんに ごうかく する こと が できました。',
          questionTextFurigana: 'せんせい の（　　）、しけんに ごうかく する こと が できました。',
          marks: 10,
          explanation: 'For positive outcomes due to someone\'s help, use 〜のおかげで (thanks to).',
          explanationBn: 'কারো অনুগ্রহ বা অবদানের কারণে ইতিবাচক ফলাফল বোঝাতে おかげで (ওকাগেদে) ব্যবহৃত হয়।',
          order: 1,
          options: [
            { label: '1', text: 'せいで', isCorrect: false },
            { label: '2', text: 'おかげで', isCorrect: true },
            { label: '3', text: 'ために', isCorrect: false },
            { label: '4', text: 'ばかりに', isCorrect: false },
          ]
        }
      ]
    }
  ];

  for (const t of mockTests) {
    const createdTest = await prisma.mockTest.create({
      data: {
        jlptLevel: t.jlptLevel,
        title: t.title,
        titleBn: t.titleBn,
        titleJa: t.titleJa,
        description: t.description,
        descriptionBn: t.descriptionBn,
        descriptionJa: t.descriptionJa,
        timeLimitMinutes: t.timeLimitMinutes,
        totalMarks: t.totalMarks,
        passingScore: t.passingScore,
        published: true,
      }
    });

    for (const q of t.questions) {
      const createdQ = await prisma.question.create({
        data: {
          mockTestId: createdTest.id,
          category: q.category,
          questionText: q.questionText,
          questionTextFurigana: q.questionTextFurigana,
          passage: q.passage || null,
          marks: q.marks,
          explanation: q.explanation,
          explanationBn: q.explanationBn,
          order: q.order,
        }
      });

      for (const opt of q.options) {
        await prisma.questionOption.create({
          data: {
            questionId: createdQ.id,
            label: opt.label,
            text: opt.text,
            isCorrect: opt.isCorrect,
          }
        });
      }
    }
  }
  console.log('✓ Mock Tests & Questions seeded');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
