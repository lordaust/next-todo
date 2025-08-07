# 🔐 Security Guidelines

> This document outlines how the `next15_template` project ensures privacy, compliance, and secure engineering practices across all layers of the application.

These security principles are based on industry best practices and GDPR requirements.

## 🔐 Authentication / Authorization

- Rely on trusted Identity Providers (IdPs)
- Validate tokens and scopes server-side
- Only expose authenticated components using Server Components when possible

## 🔎 Anonymity First

- Avoid storing emails, names, or identifiers unless absolutely necessary
- Use pseudonymous identifiers (sub from JWTs, GUIDs, etc.)
- If personal data is required, fetch it dynamically from secure endpoints

## 🧼 Secure by Default

- Disable public routes or open endpoints unless whitelisted
- Enforce HTTPS everywhere
- Prevent default exposures (e.g., sensitive headers, misconfigured middleware)

## 📦 Accessibility & Inclusivity

- Use semantic HTML tags (`<label>`, `<main>`, `<section>`, etc.)
- Support keyboard-only navigation
- Provide alt text for images and proper ARIA roles
- Avoid relying solely on color to convey information

## 🧪 Automated Testing & Auditing

- Set up Playwright or OWASP ZAP-style scans in CI/CD
- Block merges on failed vulnerability scans or static analysis
- Manually retest after dependency updates, especially for auth/crypto packages

## ⚠️ Common Pitfalls to Avoid

| ❌ Anti-pattern | ✅ Secure Alternative |
|-----------------|----------------------|
| Inline secrets in source code | Use environment variables |
| User-generated content rendered raw | Sanitize or escape content |
| No input validation for external payload | Use Zod and reject malformed inputs early |
| Using email or name as user identifier | Use opaque GUIDs or IdP sub claims |
| Skipping alt text or keyboard traps | Meet WCAG 2.1 accessibility guidelines |

---

## 🧭 Guiding Principles

1. **Validate everything at the boundary**  
   All incoming and outgoing data must be validated, sanitized, and typed using schema parsers like `zod`.

2. **Least privilege & secure defaults**  
   Enforce strict access policies, use encrypted communication (e.g., HTTPS, TLS), and expose only what is necessary.

3. **Anonymity First / GDPR by design**  
   Do not persist personally identifiable information unless essential. Use anonymous identifiers (e.g., GUIDs) and access sensitive data securely, on-demand.

4. **Accessibility & inclusivity**  
   All UIs must comply with WCAG standards — semantic markup, keyboard navigation, proper ARIA usage, and readable contrast.

5. **Test and verify security continuously**  
   Security testing (e.g., penetration scans, vulnerability audits) must run regularly and block deployments if critical issues are found.

---

## ✅ Practices & Conventions

### 🔍 Input Validation & Sanitization

- All external inputs (API requests, query params, forms, etc.) must be validated using [Zod](https://zod.dev/).
- Place all schemas inside `/lib/validation` or feature-scoped folders.
- Reject invalid or malformed payloads immediately with meaningful error messages.

### 📜 Configuration Management

- Use `/constants` for secure tokens, environment settings, and feature flags.
- No secrets should be hardcoded in the codebase — rely on environment variables via `.env.local` and `process.env`.

```ts
// NEVER DO THIS ❌
const API_KEY = '123abc-secret-key';

// DO THIS ✅
const API_KEY = process.env.EXTERNAL_API_KEY;
