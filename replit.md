# replit.md

## Overview

This is a full-stack tech services business website called "Tech Solutions" (branded as "IrGadgets"). It's a modern SaaS-style marketing and service catalog site that showcases computer repair, web development, mobile app development, and IT maintenance services. The application allows visitors to browse products/services and submit inquiry forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: RESTful JSON API with typed route definitions in `shared/routes.ts`
- **Build System**: Custom build script using esbuild for server bundling and Vite for client
- **Development**: Vite dev server with HMR proxied through Express

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with Zod integration via drizzle-zod
- **Tables**: Products (services catalog) and Inquiries (contact form submissions)
- **Migrations**: Drizzle Kit for schema management (`db:push` command)

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route pages (Home, Products, Contact, About)
│       ├── hooks/        # Custom React hooks for data fetching
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared types and schemas
│   ├── schema.ts     # Drizzle table definitions
│   └── routes.ts     # API contract definitions
└── migrations/       # Database migrations
```

### Design Patterns
- **Shared Schema**: Types are derived from Drizzle schemas and shared between client/server
- **API Contract**: Route definitions with Zod schemas ensure type-safe API communication
- **Storage Abstraction**: `IStorage` interface allows for swappable data implementations
- **Component Library**: Full shadcn/ui component set with dark theme customizations

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations

### UI Libraries
- **Radix UI**: Headless component primitives (dialogs, dropdowns, forms, etc.)
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend build tool with React plugin and HMR
- **esbuild**: Server-side bundling for production
- **TypeScript**: Full type coverage across the stack

### Fonts
- Google Fonts: Inter (primary), Orbitron, Rajdhani, DM Sans, Fira Code, Geist Mono