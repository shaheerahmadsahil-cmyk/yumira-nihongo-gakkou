import { PrismaClient } from "@prisma/client";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function getDatabaseUrl() {
  const envUrl = process.env.DATABASE_URL;
  if (envUrl && (envUrl.startsWith("postgresql://") || envUrl.startsWith("postgres://"))) {
    return envUrl;
  }
  // For SQLite on Windows, always use normalized absolute path to prevent Error 14
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
