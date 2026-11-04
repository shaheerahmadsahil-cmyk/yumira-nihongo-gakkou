export interface MockOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface MockQuestionData {
  id: string;
  category: "KANJI" | "VOCABULARY" | "CONTEXT" | "GRAMMAR" | "READING" | "LISTENING";
  questionText: string;
  questionTextFurigana?: string;
  passage?: string | null;
  audioText?: string | null; // Text read aloud by Japanese voice for listening questions
  marks: number;
  order: number;
  explanation: string;
  explanationBn: string;
  options: MockOption[];
}

export interface MockTestData {
  id: string;
  jlptLevel: "N5" | "N4" | "N3";
  title: string;
  titleBn: string;
  titleJa: string;
  description: string;
  descriptionBn: string;
  descriptionJa: string;
  timeLimitMinutes: number;
  totalMarks: number;
  passingScore: number;
  questions: MockQuestionData[];
}

export const n5MockTest: MockTestData = {
  id: "test-n5-01",
  jlptLevel: "N5",
  title: "JLPT N5 Comprehensive Simulation Mock Exam",
  titleBn: "JLPT N5 পূর্ণাঙ্গ সিমুলেশন মক টেস্ট (কাঞ্জি, ভোকাব, ব্যাকরণ, রিডিং ও লিসেনিং)",
  titleJa: "JLPT N5 総合シミュレーション模擬試験",
  description: "Authentic JLPT N5 exam covering Kanji, Vocabulary, Contextual Usage, Grammar, Reading Passage, and Audio Listening.",
  descriptionBn: "JLPT N5 প্যাটার্নে তৈরি ১৬টি প্রশ্নের পূর্ণাঙ্গ টেস্ট: ৪টি কাঞ্জি, ২টি ভোকাবুলারি, ২টি শব্দ ব্যবহার, ৩টি ব্যাকরণ, ১টি বড় গল্পের রিডিং এবং ৩টি লিসেনিং অডিও।",
  descriptionJa: "漢字4問、語彙2問、文脈規定2問、文法3問、読解2問、聴解3問の完全模擬試験。",
  timeLimitMinutes: 45,
  totalMarks: 100,
  passingScore: 60,
  questions: [
    // --- ১. KANJI (কাঞ্জি - ৪ টি প্রশ্ন) ---
    {
      id: "n5-q1",
      category: "KANJI",
      questionText: "あした、友達と「日曜日」に 会います。",
      questionTextFurigana: "あした、<ruby>友達<rt>ともだち</rt></ruby>と「<ruby>日曜日<rt>にちようび</rt></ruby>」に <ruby>会<rt>あ</rt></ruby>います。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 1,
      explanation: "「日曜日」is read as「にちようび」(Sunday).",
      explanationBn: "「日曜日」এর সঠিক উচ্চারণ 'নিচিয়ৌবি' (রবিবার)।",
      options: [
        { id: "n5-q1-a", label: "A", text: "にちようび", isCorrect: true },
        { id: "n5-q1-b", label: "B", text: "げつようび", isCorrect: false },
        { id: "n5-q1-c", label: "C", text: "かようび", isCorrect: false },
        { id: "n5-q1-d", label: "D", text: "すいようび", isCorrect: false },
      ],
    },
    {
      id: "n5-q2",
      category: "KANJI",
      questionText: "あの「学校」は とても 大きいです。",
      questionTextFurigana: "あの「<ruby>学校<rt>がっこう</rt></ruby>」は とても <ruby>大<rt>おお</rt></ruby>きいです。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 2,
      explanation: "「学校」is read as「がっこう」(School).",
      explanationBn: "「学校」এর সঠিক উচ্চারণ 'গাক্কৌ' (বিদ্যালয়/স্কুল)।",
      options: [
        { id: "n5-q2-a", label: "A", text: "がくせい", isCorrect: false },
        { id: "n5-q2-b", label: "B", text: "がっこう", isCorrect: true },
        { id: "n5-q2-c", label: "C", text: "だいがく", isCorrect: false },
        { id: "n5-q2-d", label: "D", text: "こうこう", isCorrect: false },
      ],
    },
    {
      id: "n5-q3",
      category: "KANJI",
      questionText: "わたしは 毎朝 [ほん] を 読みます。正しい漢字はどれですか。",
      questionTextFurigana: "わたしは <ruby>毎朝<rt>まいあさ</rt></ruby> [ほん] を <ruby>読<rt>よ</rt></ruby>みます。<ruby>正<rt>ただ</rt></ruby>しい<ruby>漢字<rt>かんじ</rt></ruby>はどれですか。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 3,
      explanation: "「ほん」(book) in Kanji is written as「本」.",
      explanationBn: "「ほん」(বই) এর সঠিক কানজি হলো「本」。",
      options: [
        { id: "n5-q3-a", label: "A", text: "木", isCorrect: false },
        { id: "n5-q3-b", label: "B", text: "本", isCorrect: true },
        { id: "n5-q3-c", label: "C", text: "休", isCorrect: false },
        { id: "n5-q3-d", label: "D", text: "体", isCorrect: false },
      ],
    },
    {
      id: "n5-q4",
      category: "KANJI",
      questionText: "駅の 前に [ひと] が たくさん います。正しい漢字はどれですか。",
      questionTextFurigana: "<ruby>駅<rt>えき</rt></ruby>の <ruby>前<rt>まえ</rt></ruby>に [ひと] が たくさん います。<ruby>正<rt>ただ</rt></ruby>しい<ruby>漢字<rt>かんじ</rt></ruby>はどれですか。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 4,
      explanation: "「ひと」(person) in Kanji is written as「人」.",
      explanationBn: "「ひと」(মানুষ/ব্যক্তি) এর সঠিক কানজি হলো「人」。",
      options: [
        { id: "n5-q4-a", label: "A", text: "人", isCorrect: true },
        { id: "n5-q4-b", label: "B", text: "入", isCorrect: false },
        { id: "n5-q4-c", label: "C", text: "大", isCorrect: false },
        { id: "n5-q4-d", label: "D", text: "八", isCorrect: false },
      ],
    },

    // --- ২. VOCABULARY (ভোকাবুলারি - ২ টি প্রশ্ন) ---
    {
      id: "n5-q5",
      category: "VOCABULARY",
      questionText: "朝ごはんを _____ から、学校へ 行きます。",
      questionTextFurigana: "<ruby>朝<rt>あさ</rt></ruby>ごはんを _____ から、<ruby>学校<rt>がっこう</rt></ruby>へ <ruby>行<rt>い</rt></ruby>きます。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 5,
      explanation: "Te-form + から means 'after doing'. '食べてから' = after eating.",
      explanationBn: "খাওয়ার পর বোঝাতে 'তাবেতে কারা' (食べてから) ব্যবহৃত হয়।",
      options: [
        { id: "n5-q5-a", label: "A", text: "たべて", isCorrect: true },
        { id: "n5-q5-b", label: "B", text: "のんで", isCorrect: false },
        { id: "n5-q5-c", label: "C", text: "かって", isCorrect: false },
        { id: "n5-q5-d", label: "D", text: "いって", isCorrect: false },
      ],
    },
    {
      id: "n5-q6",
      category: "VOCABULARY",
      questionText: "「つくえ」の 正しい 意味(いみ) は どれですか。",
      questionTextFurigana: "「つくえ」の <ruby>正<rt>ただ</rt></ruby>しい <ruby>意味<rt>いみ</rt></ruby> は どれですか。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 6,
      explanation: "「つくえ (tsukue)」means Desk / Table in Bengali (টেবিল/ডেস্ক).",
      explanationBn: "「つくえ」শব্দটির অর্থ হলো 'টেবিল / পড়ার ডেস্ক' (Desk/Table)।",
      options: [
        { id: "n5-q6-a", label: "A", text: "টেবিল / পড়ার ডেস্ক (Desk)", isCorrect: true },
        { id: "n5-q6-b", label: "B", text: "চেয়ার / কেদারা (Chair)", isCorrect: false },
        { id: "n5-q6-c", label: "C", text: "বইয়ের আলমারি (Bookshelf)", isCorrect: false },
        { id: "n5-q6-d", label: "D", text: "কলম ও খাতা (Pen & Notebook)", isCorrect: false },
      ],
    },

    // --- ৩. CONTEXT / USAGE (শব্দ ব্যবহার - ২ টি প্রশ্ন) ---
    {
      id: "n5-q7",
      category: "CONTEXT",
      questionText: "「あした」を 使った 文で 最も 適切なものは どれですか。",
      questionTextFurigana: "「あした」を <ruby>使<rt>つか</rt></ruby>った <ruby>文<rt>ぶん</rt></ruby>で <ruby>最<rt>もっと</rt></ruby>も <ruby>適切<rt>てきせつ</rt></ruby>なものは どれですか。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 7,
      explanation: "「あした」(Tomorrow) refers to future, so it must use non-past tense (行きます).",
      explanationBn: "「あした」(আগামীকাল) ভবিষ্যতের ঘটনা, তাই অতীতকাল নয়, বর্তমান/ভবিষ্যৎ কাল (行きます) হবে।",
      options: [
        { id: "n5-q7-a", label: "A", text: "あした 友達と 日本語を 勉強しました。", isCorrect: false },
        { id: "n5-q7-b", label: "B", text: "あした 友達と 東京へ 行きます。", isCorrect: true },
        { id: "n5-q7-c", label: "C", text: "きのう あしたの テストが ありました。", isCorrect: false },
        { id: "n5-q7-d", label: "D", text: "おととい あしたへ 帰りました。", isCorrect: false },
      ],
    },
    {
      id: "n5-q8",
      category: "CONTEXT",
      questionText: "部屋に 人を 招く(まねく) とき、何と 言いますか。",
      questionTextFurigana: "<ruby>部屋<rt>へや</rt></ruby>に <ruby>人<rt>ひと</rt></ruby>を <ruby>招<rt>まね</rt></ruby>くとき、<ruby>何<rt>なん</rt></ruby>と <ruby>言<rt>い</rt></ruby>いますか。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 8,
      explanation: "When inviting someone into a room:「どうぞ お入りください」(Please come in).",
      explanationBn: "কাউকে ঘরে প্রবেশের আমন্ত্রণ জানাতে বলা হয়: 'দৌজ়ো ওহাইরি কুদাসাই' (অনুগ্রহ করে ভেতরে আসুন)।",
      options: [
        { id: "n5-q8-a", label: "A", text: "どうぞ お入りください。(দয়া করে ভেতরে আসুন)", isCorrect: true },
        { id: "n5-q8-b", label: "B", text: "失礼しました。(মাফ করবেন/বিদায়)", isCorrect: false },
        { id: "n5-q8-c", label: "C", text: "ごめんなさい。(দুঃখিত)", isCorrect: false },
        { id: "n5-q8-d", label: "D", text: "いただきます。(খাওয়া শুরুর অভিবাদন)", isCorrect: false },
      ],
    },

    // --- ৪. GRAMMAR (ব্যাকরণ - ৩ টি প্রশ্ন) ---
    {
      id: "n5-q9",
      category: "GRAMMAR",
      questionText: "わたし _____ バングラデシュから 来ました。ラキブ です。",
      questionTextFurigana: "わたし _____ バングラデシュから <ruby>来<rt>き</rt></ruby>ました。ラキブ です。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 9,
      explanation: "Topic marker particle「は」(pronounced wa) is used after わたし.",
      explanationBn: "বাক্যের মূল বিষয় (Topic) নির্দেশ করতে পার্টিকল 'は' (ওয়া) বসে।",
      options: [
        { id: "n5-q9-a", label: "A", text: "は (wa)", isCorrect: true },
        { id: "n5-q9-b", label: "B", text: "を (wo)", isCorrect: false },
        { id: "n5-q9-c", label: "C", text: "で (de)", isCorrect: false },
        { id: "n5-q9-d", label: "D", text: "へ (e)", isCorrect: false },
      ],
    },
    {
      id: "n5-q10",
      category: "GRAMMAR",
      questionText: "毎日、電車 _____ 乗って、会社 _____ 行きます。",
      questionTextFurigana: "<ruby>毎日<rt>まいにち</rt></ruby>、<ruby>電車<rt>でんしゃ</rt></ruby> _____ <ruby>乗<rt>の</rt></ruby>って、<ruby>会社<rt>かいしゃ</rt></ruby> _____ <ruby>行<rt>い</rt></ruby>きます。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 10,
      explanation: "Veicle ride takes「に」with 乗る, and direction takes「へ」or「に」with 行く.",
      explanationBn: "যানে ওঠা (乗る)-এর সাথে 'に' এবং গন্তব্য (行く)-এর সাথে 'へ' বসে।",
      options: [
        { id: "n5-q10-a", label: "A", text: "に ／ へ", isCorrect: true },
        { id: "n5-q10-b", label: "B", text: "で ／ を", isCorrect: false },
        { id: "n5-q10-c", label: "C", text: "を ／ で", isCorrect: false },
        { id: "n5-q10-d", label: "D", text: "から ／ まで", isCorrect: false },
      ],
    },
    {
      id: "n5-q11",
      category: "GRAMMAR",
      questionText: "きのう、図書館で とても 面白い 本を _____。",
      questionTextFurigana: "きのう、<ruby>図書館<rt>としょかん</rt></ruby>で とても <ruby>面白<rt>おもしろ</rt></ruby>い <ruby>本<rt>ほん</rt></ruby>を _____。",
      passage: null,
      audioText: null,
      marks: 6,
      order: 11,
      explanation: "Yesterday (きのう) requires polite past tense「読みました」.",
      explanationBn: "অতীতকালের ঘটনা (きのう/গতকাল) থাকায় ক্রিয়ার অতীত রূপ '読みました' (পড়েছিলাম) হবে।",
      options: [
        { id: "n5-q11-a", label: "A", text: "読みます", isCorrect: false },
        { id: "n5-q11-b", label: "B", text: "読みました", isCorrect: true },
        { id: "n5-q11-c", label: "C", text: "読みません", isCorrect: false },
        { id: "n5-q11-d", label: "D", text: "読まないでした", isCorrect: false },
      ],
    },

    // --- ৫. READING COMPREHENSION (প্যাসেজ / বড় গল্প - ২ টি প্রশ্ন) ---
    {
      id: "n5-q12",
      category: "READING",
      questionText: "問題１：ラキブさんは 毎朝 何時に 起きますか。",
      questionTextFurigana: "<ruby>問題<rt>もんだい</rt></ruby>１：ラキブさんは <ruby>毎朝<rt>まいあさ</rt></ruby> <ruby>何時<rt>なんじ</rt></ruby>に <ruby>起<rt>お</rt></ruby>きますか。",
      passage: "【本文 / গল্প】\n私の名前はラキブです。バングラデシュのダッカから来ました。今、ユミラ日本語学校で日本語を一生懸命勉強しています。毎朝７時に起きて、朝ごはんを食べてから、８時半に学校へ行きます。学校の先生はとても親切で、日本の文化やマナーについても優しく教えてくれます。私の夢は、来年日本へ留学して、本物の桜と富士山を見ることです。将来は日本でITの仕事がしたいです。",
      audioText: null,
      marks: 7,
      order: 12,
      explanation: "The passage clearly states:「毎朝７時に起きて」(wakes up at 7:00 every morning).",
      explanationBn: "প্যাসেজে পরিষ্কারভাবে বলা আছে: '毎朝７時に起きて' অর্থাৎ রাতিব সাহেব প্রতিদিন সকাল ৭টায় ঘুম থেকে ওঠেন।",
      options: [
        { id: "n5-q12-a", label: "A", text: "６時半 (সকাল ৬:৩০)", isCorrect: false },
        { id: "n5-q12-b", label: "B", text: "７時 (সকাল ৭:০০)", isCorrect: true },
        { id: "n5-q12-c", label: "C", text: "８時半 (সকাল ৮:৩০)", isCorrect: false },
        { id: "n5-q12-d", label: "D", text: "９時 (সকাল ৯:০০)", isCorrect: false },
      ],
    },
    {
      id: "n5-q13",
      category: "READING",
      questionText: "問題２：ラキブさんの「夢」について、文章と合っているものはどれですか。",
      questionTextFurigana: "<ruby>問題<rt>もんだい</rt></ruby>２：ラキブさんの「<ruby>夢<rt>ゆめ</rt></ruby>」について、<ruby>文章<rt>ぶんしょう</rt></ruby>と<ruby>合<rt>あ</rt></ruby>っているものはどれですか。",
      passage: "【本文 / গল্প】\n私の名前はラキブです。バングラデシュのダッカから来ました。今、ユミラ日本語学校で日本語を一生懸命勉強しています。毎朝７時に起きて、朝ごはんを食べてから、８時半に学校へ行きます。学校の先生はとても親切で、日本の文化やマナーについても優しく教えてくれます。私の夢は、来年日本へ留学して、本物の桜と富士山を見ることです。将来は日本でITの仕事がしたいです。",
      audioText: null,
      marks: 7,
      order: 13,
      explanation: "His dream is to study abroad in Japan next year and see real Sakura and Mount Fuji.",
      explanationBn: "প্যাসেজে বলা হয়েছে: আগামী বছর জাপানে উচ্চশিক্ষায় গিয়ে আসল সাকুরা ও মাউন্ট ফুজি দেখা তার স্বপ্ন।",
      options: [
        { id: "n5-q13-a", label: "A", text: "日本へ留学して桜と富士山を見ること (জাপানে উচ্চশিক্ষা ও সাকুরা-ফুজি দর্শন)", isCorrect: true },
        { id: "n5-q13-b", label: "B", text: "ダッカでずっと日本語の先生になること (ঢাকায় শিক্ষক হওয়া)", isCorrect: false },
        { id: "n5-q13-c", label: "C", text: "新しい電車を買うこと (নতুন ট্রেন কেনা)", isCorrect: false },
        { id: "n5-q13-d", label: "D", text: "朝ごはんを食べないこと (নাস্তা না খাওয়া)", isCorrect: false },
      ],
    },

    // --- ৬. LISTENING AUDIO (লিসেনিং অডিও - ৩ টি প্রশ্ন) ---
    {
      id: "n5-q14",
      category: "LISTENING",
      questionText: "【聴解問題１】会話を聞いて、質問に答えてください。男の人は今 何時だと言いましたか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>１】<ruby>会話<rt>かいわ</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<ruby>質問<rt>しつもん</rt></ruby>に<ruby>答<rt>こた</rt></ruby>えてください。<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は<ruby>今<rt>いま</rt></ruby> <ruby>何時<rt>なんじ</rt></ruby>だと<ruby>言<rt>い</rt></ruby>いましたか。",
      passage: "🔊 নিচের অডিও বাটনে ক্লিক করে জাপানি কথোপকথনটি মনোযোগ দিয়ে শুনুন, তারপর সঠিক উত্তর নির্বাচন করুন।",
      audioText: "すみません、今、何時ですか。・・・ええと、今、午後３時１５分ですよ。・・・ありがとうございます。",
      marks: 6,
      order: 14,
      explanation: "The speaker said:「今、午後３時１５分ですよ」(It is 3:15 PM).",
      explanationBn: "কথোপকথনে বলা হয়েছে: '今、午後３時１５分ですよ' অর্থাৎ এখন বিকেল ৩টা ১৫ মিনিট।",
      options: [
        { id: "n5-q14-a", label: "A", text: "午後３時１５分 (বিকেল ৩:১৫)", isCorrect: true },
        { id: "n5-q14-b", label: "B", text: "午後３時５０分 (বিকেল ৩:৫০)", isCorrect: false },
        { id: "n5-q14-c", label: "C", text: "午前３時 (রাত/ভোর ৩:০০)", isCorrect: false },
        { id: "n5-q14-d", label: "D", text: "午後４時 (বিকেল ৪:০০)", isCorrect: false },
      ],
    },
    {
      id: "n5-q15",
      category: "LISTENING",
      questionText: "【聴解問題２】会話を聞いて、質問に答えてください。女の人は 全部で いくら 払いますか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>２】<ruby>会話<rt>かいわ</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<ruby>質問<rt>しつもん</rt></ruby>に<ruby>答<rt>こた</rt></ruby>えてください。<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は <ruby>全部<rt>ぜんぶ</rt></ruby>で いくら <ruby>払<rt>はら</rt></ruby>いますか。",
      passage: "🔊 নিচের অডিও বাটনে ক্লিক করে ফলের দোকানের কথোপকথনটি মনোযোগ দিয়ে শুনুন।",
      audioText: "いらっしゃいませ。・・・すみません、このリンゴは１ついくらですか。・・・１つ１５０円です。でも３つで４００円ですよ。・・・じゃ、３つください。",
      marks: 7,
      order: 15,
      explanation: "One apple is 150 yen, but 3 apples together are 400 yen. She bought 3, so she pays 400 yen.",
      explanationBn: "১টি আপেল ১৫০ ইয়েন হলেও ৩টি একসাথে নিলে ৪০০ ইয়েন। মহিলাটি ৩টি নেওয়ায় ৪০০ ইয়েন পরিশোধ করবে।",
      options: [
        { id: "n5-q15-a", label: "A", text: "１５０円 (১৫০ ইয়েন)", isCorrect: false },
        { id: "n5-q15-b", label: "B", text: "３００円 (৩০০ ইয়েন)", isCorrect: false },
        { id: "n5-q15-c", label: "C", text: "４００円 (৪০০ ইয়েন)", isCorrect: true },
        { id: "n5-q15-d", label: "D", text: "４５０円 (৪৫০ ইয়েন)", isCorrect: false },
      ],
    },
    {
      id: "n5-q16",
      category: "LISTENING",
      questionText: "【聴解問題３】会話を聞いて、質問に答えてください。駅は どこに ありますか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>３】<ruby>会話<rt>かいわ</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いて、<ruby>質問<rt>しつもん</rt></ruby>に<ruby>答<rt>こた</rt></ruby>えてください。<ruby>駅<rt>えき</rt></ruby>は どこに ありますか。",
      passage: "🔊 নিচের অডিও বাটনে ক্লিক করে রাস্তা চেনার কথোপকথনটি মনোযোগ দিয়ে শুনুন।",
      audioText: "あのう、すみません。駅はどこですか。・・・駅ですか。あそこの白い高いビルの後ろにありますよ。歩いて５分くらいです。・・・わかりました。ありがとうございます。",
      marks: 7,
      order: 16,
      explanation: "The speaker answered:「あそこの白い高いビルの後ろにありますよ」(Behind that tall white building).",
      explanationBn: "কথোপকথনে বলা হয়েছে: স্টেশনটি ওই সাদা উঁচু ভবনের ঠিক পেছনে (白いビルの後ろ)।",
      options: [
        { id: "n5-q16-a", label: "A", text: "白いビルの後ろ (সাদা ভবনের পেছনে)", isCorrect: true },
        { id: "n5-q16-b", label: "B", text: "白いビルの前 (সাদা ভবনের সামনে)", isCorrect: false },
        { id: "n5-q16-c", label: "C", text: "白いビルの中 (সাদা ভবনের ভেতরে)", isCorrect: false },
        { id: "n5-q16-d", label: "D", text: "歩いて３０分の所 (হেঁটে ৩০ মিনিটের দূরে)", isCorrect: false },
      ],
    },
  ],
};

export const allMockTestsDataset: Record<string, MockTestData> = {
  "test-n5-01": n5MockTest,
};
