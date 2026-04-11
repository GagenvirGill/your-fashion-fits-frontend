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

## Optimize Data Fetching & Display Performance
Currently fetching all items/outfits/categories in a single request on app load — doesn't scale well with hundreds of entries. Introduce pagination for items and outfits, priority-based loading depending on the current page, and consider lighter initial payloads (e.g., skip nested outfit template data until needed). Also explore skipping the server action middleman for reads to cut out an extra network hop.

## Preload & Cache Cloudflare R2 Images
Item images load from Cloudflare R2 and can be slow on first paint, especially with hundreds of items. Investigate preloading critical images (e.g., visible items on current page), using `<link rel="preload">` for above-the-fold images, leveraging Next.js `<Image>` component for automatic optimization/lazy loading, and adding appropriate `Cache-Control` headers on the R2 bucket for browser caching.

## API Error Handling & Endpoint Improvements
Add proper error handling across all API actions — surface meaningful error messages to the user instead of silent failures, handle network errors and unexpected status codes gracefully, and add retry logic where appropriate. Also revisit the API endpoint structure to follow more consistent RESTful conventions and improve naming clarity.

## Offline-Friendly Item Browsing
Register a service worker with a cache-first strategy for R2 item images. Once a user has loaded their closet, browsing works without network. The app already fetches all data on init — a service worker cache would let that data (and especially the images) persist across sessions and survive connectivity drops. Could use Workbox for routing rules and precaching the app shell.

## Draft Outfits
Allow users to be able to create outfits that don't yet have a date or a descirption and don't appear in the calender date sorted outfits view. It would be a separate draft outfits view where the user can just play around and then a cool feature could be that you select the outfit from the draft and say you wore it on xyz day and move it to the actual view with a date and description
