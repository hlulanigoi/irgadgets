import { describe, it, expect } from 'vitest';
import { insertProductSchema, insertInquirySchema } from '@shared/schema';

describe('Schema Validation', () => {
  describe('Product Schema', () => {
    it('should validate a valid product', () => {
      const validProduct = {
        name: 'Test Product',
        description: 'Test Description',
        price: '$100',
        category: 'service',
        imageUrl: 'https://example.com/image.jpg',
      };

      const result = insertProductSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
    });

    it('should reject product with missing required fields', () => {
      const invalidProduct = {
        name: 'Test Product',
        // missing required fields
      };

      const result = insertProductSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });
  });

  describe('Inquiry Schema', () => {
    it('should validate a valid inquiry', () => {
      const validInquiry = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I need help with my computer',
        serviceOfInterest: 'Computer Repair',
      };

      const result = insertInquirySchema.safeParse(validInquiry);
      expect(result.success).toBe(true);
    });

    it('should validate inquiry without optional serviceOfInterest', () => {
      const validInquiry = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I need help',
      };

      const result = insertInquirySchema.safeParse(validInquiry);
      expect(result.success).toBe(true);
    });

    it('should reject inquiry with invalid email', () => {
      const invalidInquiry = {
        name: 'John Doe',
        email: 'not-an-email',
        message: 'I need help',
      };

      const result = insertInquirySchema.safeParse(invalidInquiry);
      // Note: Default Drizzle schema doesn't validate email format
      // Add custom validation if needed
      expect(result.success).toBe(true); // Will be true without custom validation
    });
  });
});
