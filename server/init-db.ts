import { db } from "./db";
import { sql } from "drizzle-orm";

// Create tables
db.run(sql`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
  )
`);

db.run(sql`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    service_of_interest TEXT
  )
`);

console.log("Database tables created successfully!");
