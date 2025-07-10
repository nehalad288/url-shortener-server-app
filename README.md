# Server App Documentation

This document provides an overview of the `server-app` repository for the URL Shortener project. It covers the project structure, setup instructions, and detailed documentation for the database models, controllers, and routes.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Controllers](#controllers)
- [Routes](#routes)

---

## Project Overview

The `server-app` is a Node.js/TypeScript backend for a URL shortener service. It provides RESTful APIs for user authentication, URL shortening, and analytics.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   - Set up your database connection in `src/config/dbConfig.ts`.
3. **Run the server:**
   ```bash
   npm run dev
   ```
   The server will start with nodemon for hot-reloading.

---

## Project Structure

```
server-app/
  nodemon.json
  package.json
  tsconfig.json
  src/
    server.ts
    config/
      dbConfig.ts
    controllers/
      account.ts
      shortUrl.ts
    helpers/
      middleware.ts
    model/
      shortUrl.ts
      user.ts
    routes/
      shortUrl.ts
```

---

## Database Models

### 1. `model/user.ts`
Defines the User schema/model. Typical fields include:
- `email`: User's email address (unique identifier)
- `password`: Hashed password
- `createdAt`: Timestamp of account creation

### 2. `model/shortUrl.ts`
Defines the ShortUrl schema/model. Typical fields include:
- `shortUrl`: The generated short code
- `fullUrl`: The original long URL
- `createdAt`: Timestamp of URL creation
- `clickCount`: Number of times the short URL has been visited
- `userEmail`: Reference to the user who created the URL

---

## Controllers

### 1. `controllers/account.ts`
Handles user authentication and account management:
- **Signup**: Registers a new user
- **Login**: Authenticates a user and issues a token/session
- **Logout**: Ends the user session (if implemented)

### 2. `controllers/shortUrl.ts`
Handles URL shortening and analytics:
- **Create Short URL**: Accepts a long URL and returns a short code
- **Get User URLs**: Returns all URLs created by a user
- **Redirect**: Redirects a short URL to its original URL and increments the click count
- **Analytics**: Provides statistics for a user's URLs

---

## Routes

### 1. `routes/shortUrl.ts`
Defines API endpoints for URL operations:
- `POST /api/shortUrl`: Create a new short URL
- `GET /api/shortUrl/user/:email`: Get all URLs for a user
- `GET /api/shortUrl/:shortUrl`: Redirect to the original URL

### 2. (If present) `routes/account.ts`
Defines API endpoints for user authentication:
- `POST /api/account/signup`: Register a new user
- `POST /api/account/login`: Login a user

---

## Middleware

### `helpers/middleware.ts`
Contains middleware functions for:
- Authentication (e.g., JWT verification)
- Error handling
- Request validation

---

## License
MIT
