import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { defaultDbBase64 } from "./sqlite-seed";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;
  // If PostgreSQL is provided (Production / Supabase / Neon / Vercel Postgres):
  if (envUrl && (envUrl.startsWith("postgresql://") || envUrl.startsWith("postgres://"))) {
    return envUrl;
  }

  // If running on Vercel serverless environment with SQLite:
  // Vercel Lambda filesystem is read-only EXCEPT for /tmp!
  if (process.env.VERCEL) {
    const tmpDbPath = "/tmp/dev.db";
    try {
      if (!fs.existsSync(tmpDbPath)) {
        const possibleSources = [
          path.resolve(process.cwd(), "prisma/dev.db"),
          path.resolve(process.cwd(), "dev.db"),
        ];

        let copied = false;
        for (const src of possibleSources) {
          if (fs.existsSync(src)) {
            try {
              fs.copyFileSync(src, tmpDbPath);
              copied = true;
              break;
            } catch {
              // ignore and try fallback
            }
          }
        }

        // If file wasn't present in serverless package, restore from bundled base64 seed
        if (!copied && defaultDbBase64) {
          fs.writeFileSync(tmpDbPath, Buffer.from(defaultDbBase64, "base64"));
        }
      }
      return `file:${tmpDbPath}`;
    } catch (err) {
      console.error("Could not initialize SQLite database in /tmp on Vercel:", err);
    }
  }

  // Local development fallback
  const localPrismaPath = path.resolve(process.cwd(), "prisma/dev.db");
  if (!fs.existsSync(localPrismaPath) && defaultDbBase64) {
    try {
      const dir = path.dirname(localPrismaPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(localPrismaPath, Buffer.from(defaultDbBase64, "base64"));
    } catch (err) {
      console.warn("Could not auto-create local dev.db:", err);
    }
  }

  const resolvedPath = localPrismaPath.replace(/\\/g, "/");
  return `file:${resolvedPath}`;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
