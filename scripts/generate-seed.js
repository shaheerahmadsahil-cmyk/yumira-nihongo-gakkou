const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../prisma/dev.db');
const targetPath = path.resolve(__dirname, '../src/lib/sqlite-seed.ts');

if (!fs.existsSync(dbPath)) {
  console.error('db not found at', dbPath);
  process.exit(1);
}

const buffer = fs.readFileSync(dbPath);
const base64 = buffer.toString('base64');
const content = `// Auto-generated SQLite seed fallback for Vercel Serverless
export const defaultDbBase64 = "${base64}";
`;

fs.writeFileSync(targetPath, content, 'utf-8');
console.log('Successfully generated sqlite-seed.ts (bytes:', buffer.length, 'base64 length:', base64.length, ')');
