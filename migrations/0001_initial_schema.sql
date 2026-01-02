-- Initial schema for IrGadgets application
-- PostgreSQL version

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  service_of_interest TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);

-- Insert seed data
INSERT INTO products (name, description, price, category, image_url) VALUES
('Computer Repair & Diagnostics', 'Comprehensive hardware and software troubleshooting for desktops and laptops. We fix crashes, slow performance, and hardware failures.', 'Starts at $50', 'service', 'https://images.unsplash.com/photo-1597872252721-240bcdd23f96?auto=format&fit=crop&q=80'),
('Custom Website Development', 'Professional, responsive websites tailored to your business needs. From landing pages to full e-commerce solutions.', 'Contact for Quote', 'software', 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80'),
('Mobile App Development', 'Native and cross-platform mobile applications for iOS and Android. Bring your app idea to life.', 'Contact for Quote', 'software', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80'),
('SaaS Platform Subscription', 'Access our suite of productivity tools designed to streamline your business operations.', '$29/month', 'saas', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'),
('IT Maintenance Package', 'Ongoing support and maintenance for your business infrastructure. Includes regular updates and security checks.', '$199/month', 'maintenance', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')
ON CONFLICT DO NOTHING;
