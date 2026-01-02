#!/usr/bin/env node
import { db } from "./db.js";
import { products } from "../shared/schema.js";
import { logger } from "./middleware/logger.js";

/**
 * Database initialization script
 * Run this after deploying to production to seed initial data
 */

async function initializeDatabase() {
  try {
    logger.info("Starting database initialization...");

    // Check if products already exist
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length > 0) {
      logger.info(`Database already initialized with ${existingProducts.length} products`);
      return;
    }

    logger.info("Seeding database with initial products...");

    const seedProducts = [
      {
        name: "Computer Repair & Diagnostics",
        description: "Comprehensive hardware and software troubleshooting for desktops and laptops. We fix crashes, slow performance, and hardware failures.",
        price: "Starts at $50",
        category: "service",
        imageUrl: "https://images.unsplash.com/photo-1597872252721-240bcdd23f96?auto=format&fit=crop&q=80"
      },
      {
        name: "Custom Website Development",
        description: "Professional, responsive websites tailored to your business needs. From landing pages to full e-commerce solutions.",
        price: "Contact for Quote",
        category: "software",
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80"
      },
      {
        name: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android. Bring your app idea to life.",
        price: "Contact for Quote",
        category: "software",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
      },
      {
        name: "SaaS Platform Subscription",
        description: "Access our suite of productivity tools designed to streamline your business operations.",
        price: "$29/month",
        category: "saas",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
      },
      {
        name: "IT Maintenance Package",
        description: "Ongoing support and maintenance for your business infrastructure. Includes regular updates and security checks.",
        price: "$199/month",
        category: "maintenance",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
      }
    ];

    for (const product of seedProducts) {
      await db.insert(products).values(product);
      logger.info(`Added product: ${product.name}`);
    }

    logger.info("✅ Database initialization completed successfully");
    logger.info(`Total products: ${seedProducts.length}`);

  } catch (error) {
    logger.error("❌ Database initialization failed:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { initializeDatabase };
