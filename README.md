# Rakib Sensei Japanese Academy & Agency Platform
### 日本語アカデミー・JLPT学習及びエージェンシー総合プラットフォーム

A complete, production-grade Japanese Language Learning and Agency Web Application built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **PostgreSQL & Prisma ORM**, **Framer Motion**, and a secure **Admin Dashboard**.

---

## 🌟 Key Features

### 1. Multilingual Architecture (3 Languages)
- **Bengali (বাংলা)**: Natural phrasing tailored for Bangladeshi students.
- **English**: International standard academic terminology.
- **Japanese (日本語)**: Authentic Japanese expressions and kanji support.
- Instant, persistent language switcher preserved across sessions.

### 2. JLPT Course Management (N5, N4, N3)
- Individual, comprehensive course pages for **JLPT N5**, **JLPT N4**, and **JLPT N3**.
- **Dynamic Course Fees**: Course fees are **never** hardcoded. All tuition fees are stored in the database and can be edited in real-time from the Admin Dashboard.
- Course schedules, durations, detailed curriculum modules, and interactive FAQs.

### 3. WhatsApp Admission Integration
- Official WhatsApp number: `+880 1341-017323` (International format: `8801341017323`).
- Managed centrally from Admin Settings.
- Pre-filled multilingual messages identifying the exact course level (N5, N4, N3, or General).
- Floating action button on mobile and desktop with pulse radar effect.

### 4. Interactive Hiragana & Katakana Centers
- All 46 basic characters, Dakuten, Handakuten, and Yoon combinations.
- Native Japanese audio pronunciation via Web Speech Synthesis (`ja-JP`).
- Example vocabulary with Bengali and English meanings.
- Interactive Romaji quiz and identification mode with real-time scoring.

### 5. JLPT Kanji Learning System & Dual Furigana Modes
- N5, N4, and N3 Kanji libraries with Onyomi, Kunyomi, meanings, stroke counts, and compounds.
- **Furigana Display Modes**:
  - **Learning Mode**: Shows Furigana `<ruby><rt>` annotations directly above Kanji.
  - **Exam Mode**: Strictly hides all Furigana ruby elements, replicating real JLPT exam conditions.

### 6. High-Security JLPT Mock Test Engine
- Original simulated mock tests for N5, N4, and N3.
- Categories: Vocabulary, Kanji, Grammar, Reading Comprehension, and Listening.
- Countdown timer with auto-submit when time expires.
- **Anti-Cheat Security**: Correct answers are **never** sent to the client browser before submission.
- Server-side scoring calculation, result history persistence, and celebrate confetti.
- Full answer review with explanations in Bengali and English.

### 7. Secure Admin Dashboard & Initial Setup
- Dedicated Admin Login at `/admin/login`.
- **First-Time Admin Setup** at `/admin/setup`: Allows administrators to set their own custom email and password. No default hardcoded passwords.
- Passwords hashed using `bcryptjs` with salt round 12.
- JWT session cookies (HttpOnly, Secure, SameSite).
- Course fee editor, admission lead manager, and website settings editor.

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Database Setup

The project is configured to run out of the box with SQLite for zero-dependency local development, and supports standard PostgreSQL for production deployment.

#### A. Local SQLite (Default Zero-Config):
```bash
# Push schema and generate Prisma client
npx prisma db push

# Seed database with sample courses, kana, kanji, and mock exams
node prisma/seed.js
```

#### B. PostgreSQL (Production / Docker / Supabase / Neon):
1. In your `.env` file, set your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/rakib_sensi?schema=public"
   ```
2. Switch schema to PostgreSQL:
   ```bash
   # Copy the Postgres schema
   cp prisma/schema.postgresql.prisma prisma/schema.prisma
   
   # Run migrations or push
   npx prisma db push
   
   # Seed data
   node prisma/seed.js
   ```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 First-Time Admin Account Setup

1. Open your browser and navigate to:
   ```
   http://localhost:3000/admin/setup
   ```
2. Enter your Name, desired Admin Email, and secure Password (min. 6 characters).
3. Click **Complete Setup & Sign In**.
4. You will be authenticated immediately and redirected to the **Admin Dashboard** (`/admin/dashboard`).
5. After the first admin is created, `/admin/setup` is automatically locked down against repeated use. Future logins are handled securely via `/admin/login`.

---

## 📁 Project Structure

```
rakib-sensi-japanese/
├── prisma/
│   ├── schema.prisma            # Active Prisma schema
│   ├── schema.postgresql.prisma # PostgreSQL production schema
│   ├── seed.js                  # Database seeder (settings, courses, kana, kanji, mock tests)
├── src/
│   ├── app/
│   │   ├── actions/             # Server actions (auth, fees, inquiries, test grading)
│   │   ├── admin/               # Admin portal pages (login, setup, dashboard, courses, settings)
│   │   ├── courses/             # Public courses listing & [slug] detail pages
│   │   ├── hiragana/            # Hiragana learning center
│   │   ├── katakana/            # Katakana learning center
│   │   ├── kanji/               # Kanji library with furigana switcher
│   │   ├── mock-tests/          # JLPT mock examination engine & results
│   │   ├── contact/             # Contact & admission inquiry form
│   │   ├── layout.tsx           # Root layout with navbar, footer, sakura & whatsapp
│   │   ├── page.tsx             # Homepage
│   ├── components/
│   │   ├── admin/               # Admin dashboard components
│   │   ├── courses/             # Course detail view
│   │   ├── homepage/            # Hero, About, Courses, Learning, Mock test previews
│   │   ├── layout/              # Navbar & Footer
│   │   ├── learning/            # Hiragana, Katakana, Kanji library components
│   │   ├── mock-tests/          # Mock test engine & question navigator
│   │   ├── shared/              # FuriganaText, FujiWatermark, FloatingWhatsApp, SakuraPetals
│   ├── lib/
│   │   ├── audio.ts             # Japanese speech synthesis
│   │   ├── auth.ts              # Bcrypt hashing & JWT session security
│   │   ├── db.ts                # Prisma client singleton
│   │   ├── whatsapp.ts          # Centralized WhatsApp admission URL generator
│   │   ├── context/             # FuriganaContext (Learning vs Exam mode)
│   │   ├── i18n/                # LanguageContext & dictionaries (bn, en, ja)
```
