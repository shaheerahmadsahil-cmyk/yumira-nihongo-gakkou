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
  audioUrl?: string | null; // Official MP3 audio track from JLPT Sensei
  audioText?: string | null; // Text / dialogue script
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
  title: "JLPT N5 Official Simulation Practice Exam",
  titleBn: "JLPT N5 অফিসিয়াল প্র্যাকটিস মক টেস্ট (অফিসিয়াল প্রশ্নপত্র ও লিসেনিং অডিও)",
  titleJa: "JLPT N5 公式模擬試験（文字・語彙・文法・読解・聴解完全版）",
  description: "Official JLPT N5 practice exam directly based on the Japan Foundation / JEES official test booklet with complete JLPT Sensei listening audio.",
  descriptionBn: "জাপান ফাউন্ডেশনের অফিসিয়াল N5 টেস্টবুকলেট এবং JLPT Sensei-এর আসল লিসেনিং অডিও সমন্বিত ২৫টি প্রশ্নের পূর্ণাঙ্গ মক টেস্ট।",
  descriptionJa: "文字・語彙、文法、読解、および公式聴解音声（N5Q1〜N5Q4）を含む完全版模擬試験。",
  timeLimitMinutes: 50,
  totalMarks: 100,
  passingScore: 60,
  questions: [
    // ==========================================
    // ১. 言語知識（文字・語彙）- VOCABULARY & KANJI
    // ==========================================
    {
      id: "n5-q01",
      category: "KANJI",
      questionText: "先週 デパートに かいものに いきました。",
      questionTextFurigana: "<ruby>先週<rt>せんしゅう</rt></ruby> デパートに かいものに いきました。",
      passage: "下線（＿）の 言葉は ひらがなで どう 書きますか。正しいものを １・２・３・４から 一つ えらんでください。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 1,
      explanation: "「先週」is read as「せんしゅう」(last week).",
      explanationBn: "「先週」এর সঠিক হিরাগানা রূপ হলো 'せんしゅう' (গত সপ্তাহ)।",
      options: [
        { id: "q01-opt-1", label: "1", text: "ぜんしゅ", isCorrect: false },
        { id: "q01-opt-2", label: "2", text: "せんしゅう", isCorrect: true },
        { id: "q01-opt-3", label: "3", text: "ぜんしゅう", isCorrect: false },
        { id: "q01-opt-4", label: "4", text: "せんしゅ", isCorrect: false },
      ],
    },
    {
      id: "n5-q02",
      category: "KANJI",
      questionText: "ごはんの 後で さんぽします。",
      questionTextFurigana: "ごはんの <ruby>後<rt>あと</rt></ruby>で さんぽします。",
      passage: "下線（＿）の 言葉は ひらがなで どう 書きますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 2,
      explanation: "「後で」is read as「あとで」(afterwards/later).",
      explanationBn: "「後で」এর সঠিক হিরাগানা রূপ হলো 'あとで' (পরে)।",
      options: [
        { id: "q02-opt-1", label: "1", text: "つぎ", isCorrect: false },
        { id: "q02-opt-2", label: "2", text: "うしろ", isCorrect: false },
        { id: "q02-opt-3", label: "3", text: "まえ", isCorrect: false },
        { id: "q02-opt-4", label: "4", text: "あと", isCorrect: true },
      ],
    },
    {
      id: "n5-q03",
      category: "KANJI",
      questionText: "ちかくに 山が あります。",
      questionTextFurigana: "ちかくに <ruby>山<rt>やま</rt></ruby>が あります。",
      passage: "下線（＿）の 言葉は ひらがなで どう 書きますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 3,
      explanation: "「山」is read as「やま」(mountain).",
      explanationBn: "「山」এর সঠিক হিরাগানা রূপ হলো 'やま' (পাহাড়/পর্বত)।",
      options: [
        { id: "q03-opt-1", label: "1", text: "かわ", isCorrect: false },
        { id: "q03-opt-2", label: "2", text: "やま", isCorrect: true },
        { id: "q03-opt-3", label: "3", text: "いけ", isCorrect: false },
        { id: "q03-opt-4", label: "4", text: "うみ", isCorrect: false },
      ],
    },
    {
      id: "n5-q04",
      category: "KANJI",
      questionText: "この ホテルは へやが 多いです。",
      questionTextFurigana: "この ホテルは へやが <ruby>多<rt>おお</rt></ruby>いです。",
      passage: "下線（＿）の 言葉は ひらがなで どう 書きますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 4,
      explanation: "「多い」is read as「おおい」(many / numerous).",
      explanationBn: "「多い」এর সঠিক হিরাগানা উচ্চারণ হলো 'おおい' (অনেক/বেশি)।",
      options: [
        { id: "q04-opt-1", label: "1", text: "すくない", isCorrect: false },
        { id: "q04-opt-2", label: "2", text: "おおい", isCorrect: true },
        { id: "q04-opt-3", label: "3", text: "せまい", isCorrect: false },
        { id: "q04-opt-4", label: "4", text: "ひろい", isCorrect: false },
      ],
    },
    {
      id: "n5-q05",
      category: "VOCABULARY",
      questionText: "けさ しゃわーを あびました。",
      questionTextFurigana: "けさ <ruby>しゃわー<rt>シャワー</rt></ruby>を あびました。",
      passage: "下線（＿）の 言葉は カタカナで どう 書きますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 5,
      explanation: "「しゃわー」is written as「シャワー」(shower).",
      explanationBn: "'しゃわー' এর সঠিক কাতাকানা বানান হলো 'シャワー' (গোসল/শাওয়ার)।",
      options: [
        { id: "q05-opt-1", label: "1", text: "シャワー", isCorrect: true },
        { id: "q05-opt-2", label: "2", text: "シャウー", isCorrect: false },
        { id: "q05-opt-3", label: "3", text: "ツャワー", isCorrect: false },
        { id: "q05-opt-4", label: "4", text: "ツャウー", isCorrect: false },
      ],
    },
    {
      id: "n5-q06",
      category: "VOCABULARY",
      questionText: "コーヒーを のみました。",
      questionTextFurigana: "コーヒーを <ruby>のみました<rt>飲みました</rt></ruby>。",
      passage: "下線（＿）の 言葉は 漢字で どう 書きますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 6,
      explanation: "「のみました」is written as「飲みました」(drank).",
      explanationBn: "'のみました' এর সঠিক কাঞ্জি রূপ হলো '飲みました' (পান করেছিলাম)।",
      options: [
        { id: "q06-opt-1", label: "1", text: "飯みました", isCorrect: false },
        { id: "q06-opt-2", label: "2", text: "飲みました", isCorrect: true },
        { id: "q06-opt-3", label: "3", text: "餃みました", isCorrect: false },
        { id: "q06-opt-4", label: "4", text: "飮みました", isCorrect: false },
      ],
    },
    {
      id: "n5-q07",
      category: "CONTEXT",
      questionText: "わたしの へやは この（ ）の 2かいです。",
      questionTextFurigana: "わたしの へやは この（ ）の 2<ruby>階<rt>かい</rt></ruby>です。",
      passage: "（ ）に 何を 入れますか。１・２・３・４から いちばん いいものを 一つ えらんでください。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 7,
      explanation: "A residential building where rooms are located on floors is an「アパート」(apartment).",
      explanationBn: "আবাসিক ভবনের ২য় তলায় থাকার কামরা বোঝাতে 'アパート' (অ্যাপার্টমেন্ট) ব্যবহৃত হয়।",
      options: [
        { id: "q07-opt-1", label: "1", text: "エレベーター", isCorrect: false },
        { id: "q07-opt-2", label: "2", text: "プール", isCorrect: false },
        { id: "q07-opt-3", label: "3", text: "エアコン", isCorrect: false },
        { id: "q07-opt-4", label: "4", text: "アパート", isCorrect: true },
      ],
    },
    {
      id: "n5-q08",
      category: "CONTEXT",
      questionText: "さとうさんは ギターを じょうずに（ ）。",
      questionTextFurigana: "さとうさんは ギターを じょうずに（ ）。",
      passage: "（ ）に 何を 入れますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 8,
      explanation: "For stringed instruments like a guitar or piano, the verb is「ひきます」(to play).",
      explanationBn: "গিটার বা পিয়ানোর মতো বাদ্যযন্ত্র বাজানোর ক্ষেত্রে ক্রিয়াপদ 'ひきます' ব্যবহৃত হয়।",
      options: [
        { id: "q08-opt-1", label: "1", text: "うたいます", isCorrect: false },
        { id: "q08-opt-2", label: "2", text: "ききます", isCorrect: false },
        { id: "q08-opt-3", label: "3", text: "ひきます", isCorrect: true },
        { id: "q08-opt-4", label: "4", text: "あそびます", isCorrect: false },
      ],
    },

    // ==========================================
    // ২. 言語知識（文法）- GRAMMAR
    // ==========================================
    {
      id: "n5-q09",
      category: "GRAMMAR",
      questionText: "日本（ ）ラーメンは おいしいです。",
      questionTextFurigana: "<ruby>日本<rt>にほん</rt></ruby>（ ）ラーメンは おいしいです。",
      passage: "（ ）に 何を 入れますか。１・２・３・４から いちばん いいものを 一つ えらんでください。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 9,
      explanation: "Particle「の」connects two nouns indicating origin or possession:「日本のラーメン」(Japanese ramen).",
      explanationBn: "দুটি বিশেষ্যকে যুক্ত করে উৎপত্তি বা মালিকানা প্রকাশে পার্টিকেল 'の' ব্যবহৃত হয়: 日本のラーメン (জাপানের রামেন)।",
      options: [
        { id: "q09-opt-1", label: "1", text: "に", isCorrect: false },
        { id: "q09-opt-2", label: "2", text: "の", isCorrect: true },
        { id: "q09-opt-3", label: "3", text: "を", isCorrect: false },
        { id: "q09-opt-4", label: "4", text: "へ", isCorrect: false },
      ],
    },
    {
      id: "n5-q10",
      category: "GRAMMAR",
      questionText: "わたしには きょうだいが 二人 います。弟（ ）妹です。",
      questionTextFurigana: "わたしには きょうだいが <ruby>二人<rt>ふたり</rt></ruby> います。<ruby>弟<rt>おとうと</rt></ruby>（ ）<ruby>妹<rt>いもうと</rt></ruby>です。",
      passage: "（ ）に 何を 入れますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 10,
      explanation: "Particle「と」means 'and' when listing nouns exhaustively:「弟と妹」(younger brother and younger sister).",
      explanationBn: "দুটি বিশেষ্যের মধ্যে 'এবং' বোঝাতে পার্টিকেল 'と' ব্যবহৃত হয়: 弟と妹 (ছোট ভাই এবং ছোট বোন)।",
      options: [
        { id: "q10-opt-1", label: "1", text: "は", isCorrect: false },
        { id: "q10-opt-2", label: "2", text: "も", isCorrect: false },
        { id: "q10-opt-3", label: "3", text: "と", isCorrect: true },
        { id: "q10-opt-4", label: "4", text: "か", isCorrect: false },
      ],
    },
    {
      id: "n5-q11",
      category: "GRAMMAR",
      questionText: "きのう、わたしは ひとり（ ）えいがを 見に 行きました。",
      questionTextFurigana: "きのう、わたしは ひとり（ ）えいがを <ruby>見<rt>み</rt></ruby>に <ruby>行<rt>い</rt></ruby>きました。",
      passage: "（ ）に 何を 入れますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 11,
      explanation: "「ひとりで」indicates doing something alone (particle「で」indicates condition/means).",
      explanationBn: "একা কোনো কাজ করা বোঝাতে 'ひとりで' ব্যবহৃত হয় (পার্টিকেল 'で')।",
      options: [
        { id: "q11-opt-1", label: "1", text: "が", isCorrect: false },
        { id: "q11-opt-2", label: "2", text: "を", isCorrect: false },
        { id: "q11-opt-3", label: "3", text: "で", isCorrect: true },
        { id: "q11-opt-4", label: "4", text: "は", isCorrect: false },
      ],
    },
    {
      id: "n5-q12",
      category: "GRAMMAR",
      questionText: "子ども「いただきます。」 母「あ、食べる（ ）手を あらいましょう。」",
      questionTextFurigana: "<ruby>子<rt>こ</rt></ruby>ども「いただきます。」 <ruby>母<rt>はは</rt></ruby>「あ、<ruby>食<rt>た</rt></ruby>べる（ ）<ruby>手<rt>て</rt></ruby>を あらいましょう。」",
      passage: "（ ）に 何を 入れますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 12,
      explanation: "Dictionary form verb +「まえに」means 'before doing...':「食べるまえに」(before eating).",
      explanationBn: "ক্রিয়ার ডিকশনারি রূপের সাথে 'まえに' যুক্ত হয়ে 'করার পূর্বে' বোঝায়: 食べるまえに (খাওয়ার পূর্বে)।",
      options: [
        { id: "q12-opt-1", label: "1", text: "まえに", isCorrect: true },
        { id: "q12-opt-2", label: "2", text: "のまえに", isCorrect: false },
        { id: "q12-opt-3", label: "3", text: "あとに", isCorrect: false },
        { id: "q12-opt-4", label: "4", text: "のあとに", isCorrect: false },
      ],
    },
    {
      id: "n5-q13",
      category: "GRAMMAR",
      questionText: "A「東京でも 雪が ふりますか。」 B「ええ、ふりますよ。でも、きょねんは あまり（ ）。」",
      questionTextFurigana: "A「<ruby>東京<rt>とうきょう</rt></ruby>でも <ruby>雪<rt>ゆき</rt></ruby>が ふりますか。」 B「ええ、ふりますよ。でも、きょねんは あまり（ ）。」",
      passage: "（ ）に 何を 入れますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 13,
      explanation: "「あまり」requires a negative ending, and「きょねん」(last year) requires past tense:「ふりませんでした」.",
      explanationBn: "'あまり' এর পর নেগেটিভ রূপ বসে এবং 'きょねん' (গত বছর) থাকায় অতীতকাল 'ふりませんでした' (বৃষ্টি/তুষারপাত হয়নি) হবে।",
      options: [
        { id: "q13-opt-1", label: "1", text: "ふりませんでした", isCorrect: true },
        { id: "q13-opt-2", label: "2", text: "ふりません", isCorrect: false },
        { id: "q13-opt-3", label: "3", text: "ふりました", isCorrect: false },
        { id: "q13-opt-4", label: "4", text: "ふります", isCorrect: false },
      ],
    },
    {
      id: "n5-q14",
      category: "GRAMMAR",
      questionText: "中川「山田さんの その カメラは いいですね。どこで かいましたか。」 山田「いえ、これは 兄に（ ）。」",
      questionTextFurigana: "<ruby>中川<rt>なかがわ</rt></ruby>「<ruby>山田<rt>やまだ</rt></ruby>さんの その カメラは いいですね。どこで かいましたか。」 <ruby>山田<rt>やまだ</rt></ruby>「いえ、これは <ruby>兄<rt>あに</rt></ruby>に（ ）。」",
      passage: "（ ）に 何を 入れますか。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 14,
      explanation: "「[Person] に もらいました」means received from someone:「兄にもらいました」(I received it from my older brother).",
      explanationBn: "কারো কাছ থেকে কিছু পাওয়া বোঝাতে '[ব্যক্তি] に もらいました' ব্যবহৃত হয়: 兄にもらいました (বড় ভাইয়ের কাছ থেকে পেয়েছি)।",
      options: [
        { id: "q14-opt-1", label: "1", text: "あげました", isCorrect: false },
        { id: "q14-opt-2", label: "2", text: "もらいました", isCorrect: true },
        { id: "q14-opt-3", label: "3", text: "うりました", isCorrect: false },
        { id: "q14-opt-4", label: "4", text: "かいまし", isCorrect: false },
      ],
    },
    {
      id: "n5-q15",
      category: "GRAMMAR",
      questionText: "田中「すみません。くだもの ______ ______ ___★___ ______ か。」",
      questionTextFurigana: "<ruby>田中<rt>たなか</rt></ruby>「すみません。くだもの ______ ______ ___★___ ______ か。」\n\n1: どこ　2: あります　3: は　4: に",
      passage: "【星（★）の 並べ替え問題】正しい 文を つくったとき、★に 入る 番号を １・２・３・４から 一つ えらんでください。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 15,
      explanation: "Correct order:「くだものは (3) どこ (1) に (4)★ あります (2) か。」★ is position 3 = 4 (に).",
      explanationBn: "সঠিক বাক্য: 'くだものは どこに ありますか' (৩ ➔ ১ ➔ ৪ ➔ ২)। ★ চিহ্নের ৩ নম্বর স্থানে বসবে ৪ (に)।",
      options: [
        { id: "q15-opt-1", label: "1", text: "どこ", isCorrect: false },
        { id: "q15-opt-2", label: "2", text: "あります", isCorrect: false },
        { id: "q15-opt-3", label: "3", text: "は", isCorrect: false },
        { id: "q15-opt-4", label: "4", text: "に", isCorrect: true },
      ],
    },
    {
      id: "n5-q16",
      category: "GRAMMAR",
      questionText: "B「となりの へやで ______ ______ ___★___ ______ して います。」",
      questionTextFurigana: "B「となりの へやで ______ ______ ___★___ ______ して います。」\n\n1: れんしゅう　2: の　3: ギター　4: を",
      passage: "【星（★）の 並べ替え問題】正しい 文を つくったとき、★に 入る 番号を えらんでください。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 16,
      explanation: "Correct order:「となりの へやで ギター (3) の (2) れんしゅう (1)★ を (4) して います。」★ is position 3 = 1 (れんしゅう).",
      explanationBn: "সঠিক বাক্য: 'ギターの れんしゅうを して います' (৩ ➔ ২ ➔ ১ ➔ ৪)। ★ স্থানে বসবে ১ (れんしゅう)।",
      options: [
        { id: "q16-opt-1", label: "1", text: "れんしゅう", isCorrect: true },
        { id: "q16-opt-2", label: "2", text: "の", isCorrect: false },
        { id: "q16-opt-3", label: "3", text: "ギター", isCorrect: false },
        { id: "q16-opt-4", label: "4", text: "を", isCorrect: false },
      ],
    },

    // ==========================================
    // ৩. 読解 - READING COMPREHENSION
    // ==========================================
    {
      id: "n5-q17",
      category: "READING",
      questionText: "「わたし」は 今日、何を しましたか。",
      questionTextFurigana: "「わたし」は <ruby>今日<rt>きょう</rt></ruby>、<ruby>何<rt>なに</rt></ruby>を しましたか。",
      passage: "わたしは 今日、友だちと 買い物に 行きました。3か月前に 見た えいがの DVDが ほしかったからです。買った DVDは、友だちや 姉と いっしょに 見ます。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 17,
      explanation: "The passage states:「わたしは 今日、友だちと 買い物に 行きました。3か月前に 見た えいがの DVDが ほしかったからです。」Therefore, she went to buy a DVD with her friend.",
      explanationBn: "অনুচ্ছেদে বলা হয়েছে: 'আজ আমি বন্ধুর সাথে কেনাকাটা করতে গিয়েছিলাম, কারণ ৩ মাস আগে দেখা সিনেমার ডিভিডি কিনতে চেয়েছিলাম।' অতএব সে বন্ধুর সাথে ডিভিডি কিনতে গিয়েছিল।",
      options: [
        { id: "q17-opt-1", label: "1", text: "友だちと えいがを 見に 行きました。", isCorrect: false },
        { id: "q17-opt-2", label: "2", text: "友だちと DVDを 買いに 行きました。", isCorrect: true },
        { id: "q17-opt-3", label: "3", text: "姉と えいがを 見に 行きました。", isCorrect: false },
        { id: "q17-opt-4", label: "4", text: "姉と DVDを 買いに 行きました。", isCorrect: false },
      ],
    },
    {
      id: "n5-q18",
      category: "READING",
      questionText: "森さんは コピーを した あとで、本を どうしますか。",
      questionTextFurigana: "<ruby>森<rt>もり</rt></ruby>さんは コピーを した あとで、<ruby>本<rt>ほん</rt></ruby>を どうしますか。",
      passage: "森さんへ\nクラスで 使う 本を 中川先生に かりました。\n5ページを 25枚 コピーして ください。\nコピーは 南さんに わたして ください。\n本は、わたしが あした かえしますから、わたしの 机の 上に おいて ください。\n山口より",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 18,
      explanation: "Yamaguchi-sensei writes:「本は、わたしが あした かえしますから、わたしの 机の 上に おいて ください。」So Mori-san should leave the book on Yamaguchi-sensei's desk.",
      explanationBn: "চিঠিতে ইয়ামাগুচি শিক্ষক বলেছেন: 'বইটি আমি কাল ফেরত দেব, তাই এটি আমার টেবিলের ওপর রেখে দিন।' অতএব বই ইয়ামাগুচি শিক্ষকের টেবিলের ওপর রাখবে।",
      options: [
        { id: "q18-opt-1", label: "1", text: "クラスで 使います。", isCorrect: false },
        { id: "q18-opt-2", label: "2", text: "南さんに わたします。", isCorrect: false },
        { id: "q18-opt-3", label: "3", text: "中川先生に かえします。", isCorrect: false },
        { id: "q18-opt-4", label: "4", text: "山口先生の 机の 上に おきます。", isCorrect: true },
      ],
    },
    {
      id: "n5-q19",
      category: "READING",
      questionText: "どうして こまりましたか。",
      questionTextFurigana: "どうして こまりましたか。",
      passage: "きのうの 夜は おそくまで しごとを しました。とても つかれました。しごとの あと、電車で 帰りました。家の 近くの 駅で 電車を おりたら、外は 雨でしたが、わたしは かさが ありませんでした。とても こまりました。",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 19,
      explanation: "The passage states:「外は 雨でしたが、わたしは かさが ありませんでした。とても こまりました。」(It was raining outside, but I had no umbrella. I was very troubled.)",
      explanationBn: "অনুচ্ছেদে স্পষ্ট বলা আছে: 'বাইরে বৃষ্টি হচ্ছিল কিন্তু আমার কোনো ছাতা ছিল না (かさが ありませんでした)। তাই আমি সমস্যায় পড়েছিলাম।'",
      options: [
        { id: "q19-opt-1", label: "1", text: "おそい 時間に 駅に 着いたから", isCorrect: false },
        { id: "q19-opt-2", label: "2", text: "しごとが たくさん あったから", isCorrect: false },
        { id: "q19-opt-3", label: "3", text: "とても つかれたから", isCorrect: false },
        { id: "q19-opt-4", label: "4", text: "かさが なかったから", isCorrect: true },
      ],
    },
    {
      id: "n5-q20",
      category: "READING",
      questionText: "あらきやで トイレットペーパーと にくと やさいを 同じ 日に 買いたいです。いつが 安いですか。",
      questionTextFurigana: "あらきやで トイレットペーパーと にくと やさいを <ruby>同<rt>おな</rt></ruby>じ <ruby>日<rt>ひ</rt></ruby>に <ruby>買<rt>か</rt></ruby>いたいです。いつが <ruby>安<rt>やす</rt></ruby>いですか。",
      passage: "【あらきや スーパー 特売チラシ（セール案内）】\n朝 8:00 〜 夜 9:00\n\n● 6月11日(月) 〜 14日(木) 安い！\n・さとう 128円\n・トイレットペーパー 490円\n\n● 6月15日(金) 〜 18日(月) 安い！\n・しょうゆ 198円\n・ティッシュペーパー 290円\n\n● 毎週 安い！\n・月・火: くだもの、魚、ジュース\n・水・木: とうふ、にく、やさい\n・金・土: パン、ぎゅうにゅう、魚、やさい",
      audioUrl: null,
      audioText: null,
      marks: 4,
      order: 20,
      explanation: "Toilet paper is on sale from June 11 to 14 (Mon-Thu). Meat and vegetables (にく、やさい) are on sale every Wednesday and Thursday (水・木). The overlapping days are June 13 (Wed) and June 14 (Thu).",
      explanationBn: "টয়লেট পেপারের ছাড় ১১ থেকে ১৪ জুন। আর মাংস ও সবজির (にく、やさい) ছাড় প্রতি বুধ ও বৃহস্পতিবার। উভয়টি একসাথে কম দামে পাওয়ার দিন হলো ১৩ জুন (বুধ) ও ১৪ জুন (বৃহস্পতি)।",
      options: [
        { id: "q20-opt-1", label: "1", text: "6月11日(月)と 12日(火)", isCorrect: false },
        { id: "q20-opt-2", label: "2", text: "6月13日(水)と 14日(木)", isCorrect: true },
        { id: "q20-opt-3", label: "3", text: "6月15日(金)と 16日(土)", isCorrect: false },
        { id: "q20-opt-4", label: "4", text: "6月17日(日)と 18日(月)", isCorrect: false },
      ],
    },

    // ==========================================
    // ৪. 聴解 - LISTENING COMPREHENSION (JLPT Sensei MP3s)
    // ==========================================
    {
      id: "n5-q21",
      category: "LISTENING",
      questionText: "【聴解問題１ - 課題理解】女の人は どの 靴下を 買いますか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>１ - <ruby>課題理解<rt>かだいりかい</rt></ruby>】<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は どの <ruby>靴下<rt>くつした</rt></ruby>を <ruby>買<rt>か</rt></ruby>いますか。",
      passage: "🔊 নিচের প্লেয়ার থেকে অফিশিয়াল অডিও শুনুন এবং সঠিক অপশন নির্বাচন করুন।\n靴下の店で女の人と店員が話しています。",
      audioUrl: "/audio/n5/N5Q1.mp3",
      audioText: "靴下の店で女の人と店員が話しています。女の人はどの靴下を買いますか。・・・すみません、子どもの靴下を探しているんですが。・・・はい、こちらの長い靴下と、短い靴下がございます。果物の柄と動物の柄がございます。・・・あ、短いほうで、果物の柄のものをください。・・・かしこまりました。",
      marks: 4,
      order: 21,
      explanation: "The customer requested:「短いほうで、果物の柄のものをください」(Short socks with fruit pattern).",
      explanationBn: "ক্রেতা বলেছে: 'ছোট মোজা এবং ফলের ছবি ওয়ালাটি দিন' (短いほうで、果物の柄)。",
      options: [
        { id: "q21-opt-1", label: "1", text: "長い靴下・果物の柄", isCorrect: false },
        { id: "q21-opt-2", label: "2", text: "長い靴下・動物の柄", isCorrect: false },
        { id: "q21-opt-3", label: "3", text: "短い靴下・果物の柄", isCorrect: true },
        { id: "q21-opt-4", label: "4", text: "短い靴下・動物の柄", isCorrect: false },
      ],
    },
    {
      id: "n5-q22",
      category: "LISTENING",
      questionText: "【聴解問題１ - 課題理解】男の人は どこへ 行きますか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>１ - <ruby>課題理解<rt>かだいりかい</rt></ruby>】<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>は どこへ <ruby>行<rt>い</rt></ruby>きますか。",
      passage: "🔊 N5Q1 অডিওর পরবর্তী অংশ মনোযোগ দিয়ে শুনুন।\nデパートで男の人と案内係が話しています。",
      audioUrl: "/audio/n5/N5Q1.mp3",
      audioText: "すみません、日本の本はどこにありますか。・・・はい、本屋は3階にございます。エレベーターで3階へお上がりください。・・・3階ですね。ありがとうございます。",
      marks: 4,
      order: 22,
      explanation: "The clerk directed him to the 3rd floor:「本屋は3階にございます」(Bookstore is on the 3rd floor).",
      explanationBn: "কর্মচারী জানিয়েছেন বইয়ের দোকান ৩য় তলায় (3階)。",
      options: [
        { id: "q22-opt-1", label: "1", text: "1階", isCorrect: false },
        { id: "q22-opt-2", label: "2", text: "2階", isCorrect: false },
        { id: "q22-opt-3", label: "3", text: "3階", isCorrect: true },
        { id: "q22-opt-4", label: "4", text: "4階", isCorrect: false },
      ],
    },
    {
      id: "n5-q23",
      category: "LISTENING",
      questionText: "【聴解問題２ - ポイント理解】女の人の 電話番号は 何番ですか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>２ - ポイント<ruby>理解<rt>りかい</rt></ruby>】<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>の <ruby>電話番号<rt>でんわばんごう</rt></ruby>は <ruby>何番<rt>なんばん</rt></ruby>ですか。",
      passage: "🔊 N5Q2 অডিও ট্র্যাকটি প্লে করুন এবং ফোন নম্বরটি শুনুন।",
      audioUrl: "/audio/n5/N5Q2.mp3",
      audioText: "電話番号を教えてください。・・・はい、512の7734です。・・・512の7744ですか。・・・いいえ、7734です。34ですよ。・・・わかりました。",
      marks: 4,
      order: 23,
      explanation: "The woman clearly clarified:「512の7734です。34ですよ」(512-7734).",
      explanationBn: "মহিলাটি নিশ্চিত করেছেন তার নম্বর ৫১২-৭৭৩৪ (512-7734)।",
      options: [
        { id: "q23-opt-1", label: "1", text: "512-7733", isCorrect: false },
        { id: "q23-opt-2", label: "2", text: "512-7734", isCorrect: true },
        { id: "q23-opt-3", label: "3", text: "512-7743", isCorrect: false },
        { id: "q23-opt-4", label: "4", text: "512-7744", isCorrect: false },
      ],
    },
    {
      id: "n5-q24",
      category: "LISTENING",
      questionText: "【聴解問題３ - 発話表現】電車でお年寄りに 席を 譲ります。何と 言いますか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>３ - <ruby>発話表現<rt>はつわひょうげん</rt></ruby>】<ruby>電車<rt>でんしゃ</rt></ruby>でお<ruby>年寄<rt>としよ</rt></ruby>りに <ruby>席<rt>せき</rt></ruby>を <ruby>譲<rt>ゆず</rt></ruby>ります。<ruby>何<rt>なん</rt></ruby>と <ruby>言<rt>い</rt></ruby>いますか。",
      passage: "🔊 N5Q3 অডিও ট্র্যাকটি প্লে করে শুনুন।\nイラストの矢印（➔）の人は何と言いますか。",
      audioUrl: "/audio/n5/N5Q3.mp3",
      audioText: "電車の中で、お年寄りに席を譲ります。何と言いますか。・・・１：どうぞ、座ってください。・・・２：すみません、座りません。・・・３：ありがとう、座ります。",
      marks: 4,
      order: 24,
      explanation: "When offering your seat to an elderly person on a train, the polite expression is「どうぞ、座ってください」(Please, take a seat).",
      explanationBn: "ট্রেনে বা বাসে বয়স্ক কাউকে বসার জন্য আসন ছেড়ে দেওয়ার সময় মার্জিতভাবে বলতে হয়: 'どうぞ、座ってください' (দয়া করে বসুন)।",
      options: [
        { id: "q24-opt-1", label: "1", text: "どうぞ、座ってください", isCorrect: true },
        { id: "q24-opt-2", label: "2", text: "すみません、座りません", isCorrect: false },
        { id: "q24-opt-3", label: "3", text: "ありがとう、座ります", isCorrect: false },
      ],
    },
    {
      id: "n5-q25",
      category: "LISTENING",
      questionText: "【聴解問題４ - 即時応答】友達に「あした、いっしょに 映画を 見に 行きませんか。」と 言われました。何と 返事を しますか。",
      questionTextFurigana: "【<ruby>聴解問題<rt>ちょうかいもんだい</rt></ruby>４ - <ruby>即時応答<rt>そくじおうとう</rt></ruby>】<ruby>友達<rt>ともだち</rt></ruby>に「あした、いっしょに <ruby>映画<rt>えいが</rt></ruby>を <ruby>見<rt>み</rt></ruby>に <ruby>行<rt>い</rt></ruby>きませんか。」と <ruby>言<rt>い</rt></ruby>われました。<ruby>何<rt>なん</rt></ruby>と <ruby>返事<rt>へんじ</rt></ruby>を しますか。",
      passage: "🔊 N5Q4 অডিও ট্র্যাকটি প্লে করে তাৎক্ষণিক উত্তরের প্রশ্নটি শুনুন।",
      audioUrl: "/audio/n5/N5Q4.mp3",
      audioText: "あした、いっしょに映画を見に行きませんか。・・・１：ええ、行きましょう。・・・２：はい、映画を見ました。・・・３：いいえ、行きませんでした。",
      marks: 4,
      order: 25,
      explanation: "To accept an invitation「〜ませんか」(won't you...?), the natural answer is「ええ、行きましょう」(Yes, let's go!).",
      explanationBn: "আমন্ত্রণ গ্রহণ করতে জাপানি ভাষায় স্বাভাবিক উত্তর হলো: 'ええ、行きましょう' (হ্যাঁ, চলুন যাই!)।",
      options: [
        { id: "q25-opt-1", label: "1", text: "ええ、行きましょう", isCorrect: true },
        { id: "q25-opt-2", label: "2", text: "はい、映画を見ました", isCorrect: false },
        { id: "q25-opt-3", label: "3", text: "いいえ、行きませんでした", isCorrect: false },
      ],
    },
  ],
};

export const allMockTestsDataset: Record<string, MockTestData> = {
  "test-n5-01": n5MockTest,
};
