# 🏗 Architecture Overview

> This document outlines the architectural principles, structure, and conventions followed in the `next15_template` project. It serves as a reference foundation for scalable, maintainable, and reliable frontend applications using **Next.js 15** and **TypeScript**.

## 🧭 Architectural Principles

### 1. Server-first Rendering

- Default to Server Components
- Use `"use client"` only where state, events, or effects are required
- Avoid useEffect and client hooks unless essential

### 2. Domain-Driven Structure

- Logic and UI are grouped into features in `/src/features/[feature-name]`
- Each feature contains server components, client components, and feature-specific logic
- Server components handle data fetching and pass props to client components
- Encourages encapsulation and scalability

### 3. Data Access Layer

- All GET functions live in `/src/data-access-layer/get`
- Functions validate and sanitize data using Zod schemas
- Separate fetch functions handle HTTP requests
- Pure utility logic lives in `/src/lib`

### 4. Consistent Component Design

- Reusable visual components go into `/src/components`
- Feature-specific components stay within their `/src/features/[feature-name]` folder
- Prefer named exports
- Typed with explicit **types** (NOT interfaces)
- File names use kebab-case

### 5. Configuration and Constants

- Place all environment variables, enums, and shared config in `/constants`
- Avoid hard-coded strings, magic numbers, or inline feature flags

## 🎨 Styling & Layout

- CSS styling is handled via inline styles
- Global styles are declared in `app/globals.css`
- Layouts use semantic HTML and WCAG-compliant accessibility practices
- Optional support for ShadCN/UI (if installed)

## 🛡 Security & Compliance

- **Anonymity First**: avoid direct personal data
- **Validate and sanitize** all input at entry points
- Follow **least privilege** and secure communication principles
- Implement **accessibility** with WCAG in mind

## 🔍 Observability & Reliability

- `/healthz` endpoint returns service-level health status
- Centralized logger with consistent log levels (INFO, WARN, ERROR, etc.)
- Graceful error handler with structured messaging
- Exceptions are enriched with context and traceable across services

## ✅ Testing Strategy

- Unit tests for pure logic in `/lib`
- Component tests using React Testing Library
- End-to-end tests using Playwright
- Tests run in CI/CD; no deployment allowed on failure

## 🧠 Developer Conventions

- Follow the **WET principle** — Write Everything Twice — when it improves readability
- Use human-readable naming
- Keep code modular, predictable, and self-contained
- Prefer simplicity over cleverness

---

## 🔧 Technology Stack

| Layer | Tech |
|-------|------|
| Framework | [Next.js 15](https://nextjs.org/docs) (App Router, Server Components) |
| Styling | Inline CSS with React style objects |
| Language | [TypeScript (strict mode)](https://www.typescriptlang.org/) |
| Runtime | Node.js + Turbopack |
| Testing | Playwright, Unit Testing |
| Linting/Formatting | ESLint + Prettier |
| Validation | [Zod](https://zod.dev/) for schemas |
| Monitoring & Logging | Custom health checks, centralized logging |

---

## 🧱 Folder Structure

```bash
/app
  ├── layout.tsx              # Root layout
  ├── page.tsx                # Root page (SSR)
  ├── globals.css             # Global CSS variables and styles
  ├── loading.tsx             # Global loader (optional)
  ├── not-found.tsx           # Custom 404 fallback
  └── api/                    # API routes
      └── ping/
          └── route.ts        # Health check endpoint

/src
  ├── features/               # Domain-specific folders (PRIMARY)
  │   └── [feature-name]/
  │       ├── components/     # Feature-specific components
  │       ├── server-components.tsx
  │       └── client-components.tsx
  ├── components/             # Reusable visual components
  ├── hooks/                  # Custom hooks (Client Components only)
  ├── lib/                    # Pure logic: formatters, validators, utilities
  │   └── service/            # Mock external services (auth, logging, etc.)
  ├── contexts/               # React contexts
  ├── data-access-layer/      # Data fetching and validation
  │   ├── get/                # GET functions with Zod validation
  │   ├── types/              # Global TypeScript types (NOT interfaces)
  │   ├── schemas/            # Zod validation schemas
  │   └── constants/          # Enums, config values, tokens
  └── styles/                 # Global CSS styles
