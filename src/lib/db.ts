import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;
  // If PostgreSQL is provided (Production / Supabase / Neon / Vercel Postgres):
  if (envUrl && (envUrl.startsWith("postgresql://") || envUrl.startsWith("postgres://"))) {
    return envUrl;
  }

  // If running on Vercel serverless environment with SQLite:
  // Vercel filesystem is read-only EXCEPT for /tmp!
  if (process.env.VERCEL) {
    const tmpDbPath = "/tmp/dev.db";
    try {
      if (!fs.existsSync(tmpDbPath)) {
        const sourcePath = path.resolve(process.cwd(), "prisma/dev.db");
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, tmpDbPath);
        }
      }
      return `file:${tmpDbPath}`;
    } catch (err) {
      console.warn("Could not copy sqlite database to /tmp on Vercel:", err);
    }
  }

  // Local development fallback
  const resolvedPath = path.resolve(process.cwd(), "prisma/dev.db").replace(/\\/g, "/");
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
