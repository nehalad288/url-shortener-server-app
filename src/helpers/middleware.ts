import rateLimit from 'express-rate-limit';

export const urlRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  message: {
    status: 429,
    error: 'Too many requests — please try again later.',
  },
  standardHeaders: true, // Add RateLimit headers to response
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});