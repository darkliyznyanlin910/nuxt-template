# Nuxt Template with Better-Auth & Drizzle ORM

A production-ready Nuxt 3 template featuring authentication with Better-Auth and database management with Drizzle ORM and PostgreSQL.

## 🚀 Features

- **Nuxt 3** - The intuitive Vue framework
- **Better-Auth** - Modern authentication with email/password, email verification, and password reset
- **Drizzle ORM** - Type-safe SQL ORM with PostgreSQL
- **Type-safe Environment Variables** - Validated with Zod and @t3-oss/env-nuxt
- **Email Service** - SMTP integration with Nodemailer
- **Development Services** - Docker Compose with PostgreSQL and MailDev
- **ESLint** - Code linting and formatting
- **Nuxt UI** - Beautiful, accessible UI components

## 📋 Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose (for development)

## 🛠️ Quick Start

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd nuxt-template
pnpm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
```

3. **Start development services:**

```bash
docker-compose up -d
```

4. **Push database schema:**

```bash
pnpm db:push
```

5. **Start development server:**

```bash
pnpm dev
```

Visit http://localhost:3000 to see your app!

## 📁 Project Structure

```
nuxt-template/
├── app/                    # Nuxt app directory
│   ├── app.vue            # Root Vue component
│   └── lib/
│       └── auth-client.ts # Better-Auth client configuration
├── server/                # Server-side code
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...all].ts # Auth API routes handler
│   │   └── hello.get.ts   # Example API route
│   ├── drizzle/
│   │   ├── db.ts          # Database connection
│   │   └── schema/
│   │       ├── index.ts   # Schema exports
│   │       └── auth.ts    # Auth tables (auto-generated)
│   └── lib/
│       ├── auth.ts        # Better-Auth server configuration
│       └── mailer.ts      # Email service setup
├── shared/
│   └── env.ts             # Environment variable validation
├── docker-compose.yaml    # Development services
└── nuxt.config.ts         # Nuxt configuration
```

## 🔐 Authentication

This template uses Better-Auth with the following features:

### Enabled Features

- **Email & Password** authentication
- **Email verification** for new accounts
- **Password reset** via email
- **Session management** with secure tokens

### Auth API Endpoints

- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Sign in user
- `POST /api/auth/sign-out` - Sign out user
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/reset-password` - Request password reset
- `GET /api/docs` - OpenAPI documentation

### Usage in Components

```vue
<script setup>
import { authClient } from "~/lib/auth-client";

// Sign up
await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Get current session
const session = await authClient.getSession();
</script>
```

## 🗄️ Database

### Schema

The database uses PostgreSQL with the following tables:

- **users** - User accounts with email verification
- **sessions** - Active user sessions
- **accounts** - OAuth accounts (for future social login)
- **verification** - Email verification tokens

### Commands

```bash
# Push schema changes to database
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio

# Regenerate auth schema (after auth config changes)
pnpm auth:generate
```

### Custom Schema

Add your own tables in `server/drizzle/schema/` and export them from `index.ts`:

```typescript
// server/drizzle/schema/posts.ts
export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  userId: text("user_id").references(() => user.id),
});

// server/drizzle/schema/index.ts
export * from "./auth";
export * from "./posts";
```

## 📧 Email Configuration

Email is configured using SMTP. For development, use the included MailDev service:

- **MailDev UI**: http://localhost:1080
- **SMTP Server**: localhost:1025

### Production Email Setup

Update your `.env` with your SMTP provider:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Your App <noreply@yourapp.com>"
```

## 🐳 Development Services

The included `docker-compose.yaml` provides:

- **PostgreSQL** - Database server on port 5432
- **MailDev** - Email testing server on port 1080 (UI) and 1025 (SMTP)

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs
```

## 🔧 Environment Variables

All environment variables are type-safe and validated using Zod. Required variables:

### Public (Client-side)

- `NUXT_PUBLIC_APP_URL` - Your app's public URL

### Server-only

- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key for auth (generate with `openssl rand -base64 32`)
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_SECURE` - Use TLS (true/false)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_FROM` - Default from address

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Database
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Drizzle Studio

# Auth
pnpm auth:generate    # Regenerate auth schema

# Utilities
pnpm with-env         # Run commands with .env loaded
```

## 🚀 Deployment

1. **Build the application:**

```bash
pnpm build
```

2. **Set environment variables** on your hosting platform

3. **Set up PostgreSQL database** and run migrations:

```bash
pnpm db:push
```

4. **Deploy** the `.output` directory

### Recommended Platforms

- **Vercel** - Zero-config deployment with PostgreSQL addon
- **Netlify** - With Neon PostgreSQL
- **Railway** - Full-stack deployment with built-in PostgreSQL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
