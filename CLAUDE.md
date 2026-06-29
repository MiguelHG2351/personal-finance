# personal-finance

## Auth flow

Supabase Auth with `@supabase/ssr`. Two clients:

- `src/shared/lib/supabase/client.ts` — browser (singleton).
- `src/shared/lib/supabase/server.ts` — server components / route handlers.

### Post-login redirect

Both email/password and Google OAuth resolve the destination the same way:
`searchParams.get('next') ?? '/dashboard'`.

- Email/password: the form calls `router.push(next)` after a successful mutation
  (`LoginForm.tsx`, `RegisterForm.tsx`).
- Google OAuth: `useSignInWithGoogle({ next })` appends `?next=...` to the
  `/auth/callback` redirect URL. The callback (`app/auth/callback/route.ts`)
  exchanges the code and redirects to `next` (fallback `/dashboard`).

### Route protection — `proxy.ts` (root)

Next.js 16 renamed the `middleware` convention to `proxy`. `proxy.ts` lives at the
project root (same level as `app/`). It refreshes the Supabase session on every
request and guards access:

- Unauthenticated → `/dashboard/*` redirects to `/login?next=<original-path>`.
- Authenticated → `/login` or `/register` redirects to `/dashboard`.

The `next` query param is the single contract shared by the proxy and the auth
forms — keep both sides on `next`.

## ⚠️ Pending configuration (Supabase dashboard — cannot be done in code)

1. **Auth → URL Configuration**
   - Site URL: the app origin (e.g. `http://localhost:3000`, prod URL).
   - Redirect URLs: add `<origin>/auth/callback` for every environment.
     OAuth will fail with `redirect_to is not allowed` if missing.
2. **Auth → Providers → Google**: enable the provider and set Client ID/Secret.
3. **Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
