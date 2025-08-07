# 📘 Code Guidelines

> This document outlines the conventions, patterns, and design principles developers must follow when contributing to `next15_template`. It ensures code is readable, scalable, testable, and follows industry best practices for modern web development.

---

## 🧠 Principles

### ✅ WET over DRY

Write code that is **self-explanatory and explicit**, even at the cost of duplication. Avoid clever abstractions unless they clearly reduce complexity.

### ✅ Human-readable naming

Use descriptive, lowercase file names (`kebab-case`) and consistent, clear variable names. Prioritize understanding over brevity.

### ✅ Modularity

Organize code into small, focused modules (e.g., components, hooks, logic utilities) and avoid creating "god files."

### ✅ Predictability

Group similar logic (e.g., all validation in `/lib/validation`) and use uniform export patterns.

---

## 🗂 Directory Conventions

| Folder         | Purpose                                                   |
|----------------|-----------------------------------------------------------|
| `/app`         | Next.js App Router entrypoints, layouts, pages, API routes |
| `/src/features` | **PRIMARY**: Domain-specific server/client components and logic |
| `/src/components` | Reusable visual components imported by feature components |
| `/src/hooks`   | Custom React hooks (always client-side)                   |
| `/src/lib`     | Pure logic: utils, formatters, validators, calculations   |
| `/src/lib/service` | Mock external services (auth, logging, sentry, etc.)  |
| `/src/contexts` | React contexts for state management                      |
| `/src/data-access-layer/get` | GET functions with Zod validation and HTTP fetch |
| `/src/data-access-layer/types` | Global TypeScript **types** (NOT interfaces) |
| `/src/data-access-layer/schemas` | Zod validation schemas for data validation |
| `/src/data-access-layer/constants` | Enums, tokens, config objects, feature flags |
| `/src/styles`  | Global CSS styles (e.g., `globals.css`)                  |

---

## 🧱 Component Guidelines

- Use **function components** with explicit `Props` **types**.
- Place reusable components in `/src/components`
- Place feature-specific components in `/src/features/[feature-name]/components`
- Components must be modular and reusable (no shared business logic inside)
- Export all components using **named exports**

```tsx
// GOOD 
export function UserCard({ name }: Props) {
  return <div className="text-xl font-bold">{name}</div>
}

// AVOID 
export default function SomethingUnrelated() { ... }
```

## 🎯 Hook Guidelines

- Hooks live in `/hooks`
- All hooks are Client Components (`"use client"` required)
- Hook files follow naming: `useSomething.ts`

```tsx
// GOOD 
export function useDebounce(value: string, delay = 300) { ... }
```

## 🧪 Utility / Lib Logic

- Place shared logic in `/lib`, grouped by concern
- Example folders: `/lib/validation`, `/lib/formatters`, `/lib/math`
- All logic must be pure and testable in isolation

```typescript
// /lib/formatters/date.ts
export function formatDate(date: Date) {
  return date.toLocaleDateString('nb-NO')
}
```

## 🧼 File & Code Conventions

- **File names**: Always `kebab-case.ts[x]`
- **Component names**: PascalCase (e.g., `UserAvatar`)
- **Props types**: Always `type`, never `interface` for entity and data object definitions
- **CSS Styling**: Use semantic inline styles. Group related styles logically.

```tsx
// GOOD ✅
<button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded" />

// AVOID ❌
<button style={{ backgroundColor: 'blue' }} />
```

## 📦 Export Conventions

| Use case | Rule |
|----------|------|
| Components | Named export only |
| Shared constants | Named export |
| Utility modules | Named export per function |
| default exports | ❌ Do not use |

## 🔧 Code Style and Linting

- All code is auto-formatted with Prettier
- ESLint with Next.js + TypeScript rules
- Linting must pass before any PR is merged
- File structure and naming reviewed during code review

## 🚧 Do & Don't Checklist

| ✅ Do | ❌ Don't |
|-------|----------|
| Favor WET code for readability | Abstract prematurely |
| Use `use client` only when necessary | Mark entire feature folders as client |
| Type everything | Use `any` |
| Sanitize and validate all input | Trust client-side form data blindly |
| Reuse design tokens from `/constants` | Hardcode color values |
| Commit with clear, scoped messages | Push directly to main |

## ❌ Patterns and api's to ALWAYS avoid

- useEffect, getServerSideProps, getStaticProps, getStaticPaths
IF these are found or suggested, notify developer immediately and flag with warnings.
