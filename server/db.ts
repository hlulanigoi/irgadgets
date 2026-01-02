import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

// Use SQLite for simplicity in this environment
const sqlite = new Database("/tmp/database.db");
export const db = drizzle(sqlite, { schema });

// For compatibility with the old pool-based code
export const pool = {
  query: async () => ({ rows: [] }),
  end: async () => {},
};
