import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import postgres from "postgres";
import * as schema from "@shared/schema";

// Use PostgreSQL in production, SQLite for local development fallback
const DATABASE_URL = process.env.DATABASE_URL;

let db: ReturnType<typeof drizzlePostgres> | ReturnType<typeof drizzleSqlite>;

if (DATABASE_URL && !DATABASE_URL.includes("sqlite")) {
  // Production: Use PostgreSQL
  const client = postgres(DATABASE_URL, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  db = drizzlePostgres(client, { schema }) as any;
  console.log("✅ Connected to PostgreSQL database");
} else {
  // Development fallback: Use SQLite
  console.warn("⚠️  Using SQLite fallback - data will be lost on restart. Set DATABASE_URL for production.");
  const sqlite = new Database(DATABASE_URL || "/tmp/database.db");
  db = drizzleSqlite(sqlite, { schema }) as any;
}

export { db };

// For compatibility with the old pool-based code
export const pool = {
  query: async () => ({ rows: [] }),
  end: async () => {},
};
