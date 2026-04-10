# Feature Ideas

## Outfit Calendar
Visual calendar showing what you wore each day. Tap a day to log or plan. Helps spot repeat patterns and plan ahead. Natural extension of existing outfit date tracking.

## Smart Outfit Suggestions
Instead of pure random, suggest outfits based on: what you haven't worn recently, weather (API integration), or "similar to outfit X". Could use simple heuristics or an LLM API.

## Richer Item Metadata
Auto-detect color, pattern, and clothing type from uploaded images (ONNX infra already exists). Enables filtering like "show me all blue tops" and smarter outfit matching.

## Outfit Sharing / Export
Generate a shareable image or link of an outfit. Good stepping stone toward social/public features.

## Wardrobe Analytics Dashboard
Cost-per-wear tracking, most/least worn items, category breakdown charts, seasonal trends. Wear data is already tracked — surface it meaningfully.

## Full SSR Migration
All pages are Client Components that fetch data on mount via Redux useEffects in ClientShell. Convert pages to Server Components that fetch via `backendClient.ts` and pass data as props. Eliminates loading spinners, reduces JS bundle, and lets the 3 data-cache reducers (items, categories, outfits) be removed — leaving only the 2 that manage client-only UI state (outfitTemplate, notifications).
