import { describe, it, expect, beforeAll } from 'vitest';
import { DatabaseStorage } from '../storage';
import type { InsertProduct, InsertInquiry } from '@shared/schema';

// Note: These are example tests. Run them with a test database.
describe('DatabaseStorage', () => {
  let storage: DatabaseStorage;

  beforeAll(() => {
    storage = new DatabaseStorage();
  });

  describe('Products', () => {
    it('should get all products', async () => {
      const products = await storage.getProducts();
      expect(Array.isArray(products)).toBe(true);
    });

    it('should get a single product by id', async () => {
      const products = await storage.getProducts();
      if (products.length > 0) {
        const product = await storage.getProduct(products[0].id);
        expect(product).toBeDefined();
        expect(product?.id).toBe(products[0].id);
      }
    });

    it('should return undefined for non-existent product', async () => {
      const product = await storage.getProduct(999999);
      expect(product).toBeUndefined();
    });

    it('should create a new product', async () => {
      const newProduct: InsertProduct = {
        name: 'Test Product',
        description: 'Test Description',
        price: '$100',
        category: 'test',
        imageUrl: 'https://example.com/image.jpg',
      };

      const created = await storage.createProduct(newProduct);
      expect(created).toBeDefined();
      expect(created.name).toBe(newProduct.name);
      expect(created.id).toBeDefined();
    });
  });

  describe('Inquiries', () => {
    it('should create a new inquiry', async () => {
      const newInquiry: InsertInquiry = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        serviceOfInterest: 'Test Service',
      };

      const created = await storage.createInquiry(newInquiry);
      expect(created).toBeDefined();
      expect(created.name).toBe(newInquiry.name);
      expect(created.email).toBe(newInquiry.email);
      expect(created.id).toBeDefined();
    });

    it('should create inquiry without serviceOfInterest', async () => {
      const newInquiry: InsertInquiry = {
        name: 'Test User 2',
        email: 'test2@example.com',
        message: 'Another test message',
      };

      const created = await storage.createInquiry(newInquiry);
      expect(created).toBeDefined();
      expect(created.serviceOfInterest).toBeUndefined();
    });
  });
});
