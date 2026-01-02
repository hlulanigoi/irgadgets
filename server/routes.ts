import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existing = await storage.getProducts();
  if (existing.length === 0) {
    await storage.createProduct({
      name: "Computer Repair & Diagnostics",
      description: "Comprehensive hardware and software troubleshooting for desktops and laptops. We fix crashes, slow performance, and hardware failures.",
      price: "Starts at $50",
      category: "service",
      imageUrl: "https://images.unsplash.com/photo-1597872252721-240bcdd23f96?auto=format&fit=crop&q=80"
    });
    await storage.createProduct({
      name: "Custom Website Development",
      description: "Professional, responsive websites tailored to your business needs. From landing pages to full e-commerce solutions.",
      price: "Contact for Quote",
      category: "software",
      imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80"
    });
    await storage.createProduct({
      name: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android. Bring your app idea to life.",
      price: "Contact for Quote",
      category: "software",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80"
    });
    await storage.createProduct({
      name: "SaaS Platform Subscription",
      description: "Access our suite of productivity tools designed to streamline your business operations.",
      price: "$29/month",
      category: "saas",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
    });
    await storage.createProduct({
      name: "IT Maintenance Package",
      description: "Ongoing support and maintenance for your business infrastructure. Includes regular updates and security checks.",
      price: "$199/month",
      category: "maintenance",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed the database
  seedDatabase().catch(console.error);

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
