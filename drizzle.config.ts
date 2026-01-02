import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not set. Using SQLite fallback for development.");
}

const isPostgres = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("sqlite");

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: isPostgres ? "postgresql" : "sqlite",
  ...(isPostgres && {
    dbCredentials: {
      url: process.env.DATABASE_URL!,
    },
  }),
  ...((!isPostgres) && {
    dbCredentials: {
      url: process.env.DATABASE_URL || "/tmp/database.db",
    },
  }),
});
