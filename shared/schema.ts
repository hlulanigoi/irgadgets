import { pgTable, serial, text, timestamp, integer as pgInteger } from "drizzle-orm/pg-core";
import { sqliteTable, text as sqliteText, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export * from "./models/auth";

// Determine which dialect to use based on DATABASE_URL
const isPostgres = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("sqlite");

// PostgreSQL tables (production)
export const productsPostgres = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  category: text("category").notNull(), // 'saas', 'hardware', 'software', 'service', 'maintenance'
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiriesPostgres = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  serviceOfInterest: text("service_of_interest"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SQLite tables (development fallback)
export const productsSqlite = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: sqliteText("name").notNull(),
  description: sqliteText("description").notNull(),
  price: sqliteText("price").notNull(),
  category: sqliteText("category").notNull(),
  imageUrl: sqliteText("image_url").notNull(),
});

export const inquiriesSqlite = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: sqliteText("name").notNull(),
  email: sqliteText("email").notNull(),
  message: sqliteText("message").notNull(),
  serviceOfInterest: sqliteText("service_of_interest"),
});

// Export the appropriate tables based on environment
export const products = isPostgres ? productsPostgres : productsSqlite;
export const inquiries = isPostgres ? inquiriesPostgres : inquiriesSqlite;

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
