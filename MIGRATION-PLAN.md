# Migration Plan: Next.js → Vite SPA

## Overview

Migrate the frontend from Next.js App Router to a Vite + React SPA with React Router. Authentication moves to the backend. Frontend becomes a pure client-side app with no server component concerns.

## Architecture

**Before**: Next.js server renders shell → client hydrates → DataLoader fetches via server actions → UI renders

**After**: Vite serves static SPA → React Router handles navigation → auth token from backend → API calls go directly to backend → UI renders

```
┌─────────────┐         ┌──────────────────┐
│  Vite SPA   │── JWT ──│  Node Backend    │
│  (static)   │← data ──│  (Render)        │
│             │         │  + Google OAuth   │
│  React      │         │  + JWT issuing    │
│  Router     │         │  + all API routes │
│  Jotai      │         └──────────────────┘
│  CSS Modules│
└─────────────┘
```

Separate repos/deployments. Vite SPA on static hosting, backend stays on Render.

---

## Phase 1: Backend Auth Changes (DO THIS FIRST)

> **You need to update the backend before the frontend migration can work.**

- [ ] Add Google OAuth flow endpoints (`/auth/google`, `/auth/google/callback`)
- [ ] Decide on Google sign-in UX approach (One Tap, redirect flow, embedded button, etc.)
- [ ] JWT creation (sign with secret, include userId, set expiry)
- [ ] JWT validation middleware (replace current `X-User-Id` header trust with JWT verification)
- [ ] Set httpOnly cookie with JWT on successful auth
- [ ] CORS configuration to allow frontend domain
- [ ] Logout endpoint that clears the cookie

---

## Phase 2: Scaffold Vite Project

- [ ] Install Vite, `@vitejs/plugin-react`, `react-router-dom`, `react-helmet-async`
- [ ] Create `vite.config.ts` with `@/*` path alias and React plugin
- [ ] Create `index.html` entry point with root div and static meta tags
- [ ] Create `src/main.tsx` as the app entry point
- [ ] Update `package.json` scripts (`dev`, `build`, `preview`)
- [ ] Update `tsconfig.json` — remove Next plugin, `.next` paths, `next-env.d.ts` include
- [ ] Add `VITE_BACKEND_URL` to `.env` (replaces `BACKEND_URL`)
- [ ] Remove `next.config.mjs`, `next-env.d.ts`, `proxy.ts`

---

## Phase 3: Authentication

### Remove NextAuth
- [ ] Remove `next-auth` from dependencies
- [ ] Delete `app/api/auth/[...nextauth]/route.ts`
- [ ] Delete `src/lib/auth.ts`
- [ ] Delete `src/providers/session-wrapper.tsx`
- [ ] Remove `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` from frontend `.env` (these now live on backend only)
- [ ] Remove `BACKEND_API_KEY` from frontend `.env` (backend validates JWTs, no API key needed on frontend)

### Create Auth Module
- [ ] `src/auth/AuthProvider.tsx` — React context providing `user`, `isAuthenticated`, `loading`, `login()`, `logout()`
- [ ] `src/auth/useAuth.ts` — hook that consumes the context
- [ ] `login()` redirects browser to backend's Google OAuth endpoint
- [ ] On app mount, check auth status via backend endpoint (e.g., `GET /auth/me`)
- [ ] `logout()` calls backend logout endpoint, clears state

---

## Phase 4: Routing

### Remove App Router
- [ ] Delete entire `app/` directory (layout.jsx, all page.jsx files, not-found.jsx)

### Add React Router
- [ ] Create `src/App.tsx` with `BrowserRouter` and route definitions:

| Path | Component | Auth Required |
|------|-----------|--------------|
| `/` | `Welcome` | No |
| `/closet` | `Closet` | Yes |
| `/closet/all` | `AllItemsView` | Yes |
| `/closet/:slug` | `CategoryView` | Yes |
| `/outfits` | `OutfitsView` | Yes |
| `/create` | `CreateView` | Yes |
| `*` | `Welcome` (404) | No |

- [ ] Create `src/components/ProtectedRoute.tsx` — redirects to `/` if not authenticated
- [ ] Update `CategoryView` to use `useParams()` instead of `slug` prop

---

## Phase 5: API Client

- [ ] Rewrite `src/api/client.ts`:
  - Remove `getServerSession` import
  - JWT is sent automatically via httpOnly cookie (no manual header needed)
  - Use `VITE_BACKEND_URL` env var (`import.meta.env.VITE_BACKEND_URL`)
  - Remove `X-User-Id` header (backend extracts userId from JWT)
  - Remove `X-API-Key` header (no longer needed)
  - Keep `cache: "no-store"` or remove entirely (browser fetch doesn't use Next's cache semantics)
- [ ] Remove `"use server"` from all action files:
  - `src/api/actions/item.ts`
  - `src/api/actions/category.ts`
  - `src/api/actions/outfit.ts`
- [ ] These remain as async functions — they now run in the browser instead of the server

---

## Phase 6: Update Providers

- [ ] `src/providers/index.tsx`:
  - Replace `SessionWrapper` with `AuthProvider`
  - Keep `DataLoader`
  - Wrap: `AuthProvider` → `DataLoader` → children
- [ ] `src/providers/data-loader.tsx`:
  - Replace `useSession()` with `useAuth()`
  - Same logic, different hook

---

## Phase 7: Update Components

### Remove "use client" (55 files)
- [ ] Remove `"use client"` directive from all files in `src/` — unnecessary in Vite SPA

### Replace next/link (3 files)
- [ ] `src/components/nav/Navbar.jsx` — `next/link` → `react-router-dom` `Link`
- [ ] `src/components/card/CategoryCard.jsx` — `next/link` → `react-router-dom` `Link`
- [ ] `src/components/cardDisplay/CategoryCardDisplay.jsx` — `next/link` → `react-router-dom` `Link`

### Replace NextAuth hooks (3 files)
- [ ] `src/views/Welcome.jsx` — replace `signIn`, `useSession` with `useAuth()`
- [ ] `src/components/nav/profilePopup/ProfilePopup.jsx` — replace `useSession`, `signOut` with `useAuth()`
- [ ] `src/providers/data-loader.tsx` — replace `useSession` with `useAuth()` (covered in Phase 6)

---

## Phase 8: Metadata & SEO

- [ ] Add `react-helmet-async` `HelmetProvider` in providers
- [ ] Add `<Helmet>` with `<title>` in each view component:
  - `Welcome` → "Your Fashion Fits"
  - `Closet` → "Your Closet | Your Fashion Fits"
  - `AllItemsView` → "All Items | Your Fashion Fits"
  - `CategoryView` → dynamic title based on category name
  - `OutfitsView` → "Your Outfits | Your Fashion Fits"
  - `CreateView` → "Create | Your Fashion Fits"
- [ ] Convert `app/robots.js` → static `public/robots.txt`
- [ ] Convert `app/sitemap.js` → static `public/sitemap.xml`
- [ ] Set default meta description and favicon in `index.html`

---

## Phase 9: Cleanup

- [ ] Remove `next` from `package.json` dependencies
- [ ] Remove `next-auth` from `package.json` dependencies
- [ ] Delete `app/` directory (if not already done)
- [ ] Delete `next.config.mjs`
- [ ] Delete `next-env.d.ts`
- [ ] Delete `proxy.ts`
- [ ] Move `app/globals.css` to `src/globals.css`, update import in `main.tsx`
- [ ] Run `npm install` to clean lockfile
- [ ] Verify build with `npm run build`
- [ ] Test all routes and auth flow

---

## What Stays the Same (No Changes Needed)

- All components in `src/components/` (just remove "use client")
- All view components in `src/views/` (just remove "use client")
- All Jotai atoms in `src/jotai/`
- All CSS Modules (31 files)
- All TypeScript types in `src/types/`
- Public assets in `public/` (16 icon files)
- `@/*` path alias
- `onnxruntime-web` usage
- Project directory structure

---

## Dependencies

### Remove
- `next`
- `next-auth`

### Add
- `vite`
- `@vitejs/plugin-react`
- `react-router-dom`
- `react-helmet-async`
