# IrGadgets API Documentation

## Base URL

```
Production: https://irgadgets.com/api
Development: http://localhost:5000/api
```

## Authentication

Currently, the API endpoints for products are public. Inquiry submission is rate-limited but does not require authentication.

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| All API routes | 100 requests per 15 minutes per IP |
| POST /api/inquiries | 5 requests per 15 minutes per IP |

Rate limit headers are included in responses:
- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Requests remaining
- `RateLimit-Reset`: Timestamp when limit resets

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

---

## Endpoints

### Health Check

#### GET /health

Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-02T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

**Status Codes:**
- `200`: Service is healthy

---

### Products

#### GET /api/products

Get all products/services.

**Query Parameters:**

None

**Response:**

```json
[
  {
    "id": 1,
    "name": "Computer Repair & Diagnostics",
    "description": "Comprehensive hardware and software troubleshooting for desktops and laptops. We fix crashes, slow performance, and hardware failures.",
    "price": "Starts at $50",
    "category": "service",
    "imageUrl": "https://images.unsplash.com/photo-1597872252721-240bcdd23f96?auto=format&fit=crop&q=80",
    "createdAt": "2025-01-02T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Custom Website Development",
    "description": "Professional, responsive websites tailored to your business needs. From landing pages to full e-commerce solutions.",
    "price": "Contact for Quote",
    "category": "software",
    "imageUrl": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80",
    "createdAt": "2025-01-02T12:00:00.000Z"
  }
]
```

**Status Codes:**
- `200`: Success

**Example:**

```bash
curl https://irgadgets.com/api/products
```

```javascript
// JavaScript fetch
const response = await fetch('https://irgadgets.com/api/products');
const products = await response.json();
```

---

#### GET /api/products/:id

Get a single product by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Product ID |

**Response:**

```json
{
  "id": 1,
  "name": "Computer Repair & Diagnostics",
  "description": "Comprehensive hardware and software troubleshooting for desktops and laptops. We fix crashes, slow performance, and hardware failures.",
  "price": "Starts at $50",
  "category": "service",
  "imageUrl": "https://images.unsplash.com/photo-1597872252721-240bcdd23f96?auto=format&fit=crop&q=80",
  "createdAt": "2025-01-02T12:00:00.000Z"
}
```

**Status Codes:**
- `200`: Success
- `404`: Product not found

**Error Response (404):**

```json
{
  "message": "Product not found"
}
```

**Example:**

```bash
curl https://irgadgets.com/api/products/1
```

```javascript
// JavaScript fetch
const response = await fetch('https://irgadgets.com/api/products/1');
if (response.ok) {
  const product = await response.json();
} else if (response.status === 404) {
  console.log('Product not found');
}
```

---

### Inquiries

#### POST /api/inquiries

Submit a contact inquiry.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Customer name |
| email | string | Yes | Customer email |
| message | string | Yes | Inquiry message |
| serviceOfInterest | string | No | Service they're interested in |

**Request Example:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help with my computer. It's running very slow and crashes frequently.",
  "serviceOfInterest": "Computer Repair & Diagnostics"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help with my computer. It's running very slow and crashes frequently.",
  "serviceOfInterest": "Computer Repair & Diagnostics",
  "createdAt": "2025-01-02T12:00:00.000Z"
}
```

**Status Codes:**
- `201`: Inquiry created successfully
- `400`: Validation error
- `429`: Too many requests (rate limit)

**Validation Error Response (400):**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Expected string, received undefined"
    }
  ]
}
```

**Rate Limit Error Response (429):**

```json
{
  "message": "Too many inquiry submissions from this IP, please try again later."
}
```

**Example:**

```bash
curl -X POST https://irgadgets.com/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I need help with my computer",
    "serviceOfInterest": "Computer Repair & Diagnostics"
  }'
```

```javascript
// JavaScript fetch
const response = await fetch('https://irgadgets.com/api/inquiries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I need help with my computer',
    serviceOfInterest: 'Computer Repair & Diagnostics'
  })
});

if (response.ok) {
  const inquiry = await response.json();
  console.log('Inquiry submitted:', inquiry);
} else if (response.status === 429) {
  console.log('Rate limit exceeded. Please try again later.');
} else {
  const error = await response.json();
  console.error('Error:', error);
}
```

---

## Data Models

### Product

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'service' | 'software' | 'saas' | 'maintenance' | 'hardware';
  imageUrl: string;
  createdAt: string; // ISO 8601 timestamp
}
```

### Inquiry

```typescript
interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  serviceOfInterest?: string;
  createdAt: string; // ISO 8601 timestamp
}
```

---

## Code Examples

### React Hook for Products

```typescript
import { useQuery } from '@tanstack/react-query';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });
}

// Usage in component
function ProductList() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### React Hook for Inquiry Submission

```typescript
import { useMutation } from '@tanstack/react-query';

export function useCreateInquiry() {
  return useMutation({
    mutationFn: async (inquiry: {
      name: string;
      email: string;
      message: string;
      serviceOfInterest?: string;
    }) => {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiry),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    }
  });
}

// Usage in component
function ContactForm() {
  const createInquiry = useCreateInquiry();

  const handleSubmit = (e) => {
    e.preventDefault();
    createInquiry.mutate({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'I need help',
    }, {
      onSuccess: () => {
        alert('Inquiry submitted successfully!');
      },
      onError: (error) => {
        alert(`Error: ${error.message}`);
      }
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Changelog

### Version 1.0.0 (2025-01-02)

- Initial API release
- Products endpoints
- Inquiries endpoint
- Rate limiting
- Security headers

---

## Support

For API support:
- GitHub Issues: https://github.com/hlulanigoi/irgadgets/issues
- Email: api@irgadgets.com
- Documentation: https://github.com/hlulanigoi/irgadgets/wiki
