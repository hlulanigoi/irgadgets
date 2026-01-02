import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import type { Express } from "express";

export function setupSecurityMiddleware(app: Express) {
  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:", "blob:"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS configuration
  const corsOrigins = process.env.CORS_ORIGINS?.split(",") || [
    "http://localhost:3000",
    "http://localhost:5000",
  ];

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10), // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply rate limiting to all API routes
  app.use("/api/", limiter);

  // Stricter rate limiting for inquiry submissions
  const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 inquiry submissions per windowMs
    message: "Too many inquiry submissions from this IP, please try again later.",
  });

  app.use("/api/inquiries", strictLimiter);
}
