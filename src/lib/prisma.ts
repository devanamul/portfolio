import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

function createClient() {
  const url = process.env.DATABASE_URL ?? `file:${path.join(process.cwd(), "dev.db")}`;
  const adapter = new PrismaLibSql({ url });
  return new PrismaClient({ adapter } as never);
}

const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof createClient> };

const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
