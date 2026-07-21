# QuickTurf Frontend

React + Vite + Tailwind CSS frontend for the QuickTurf turf-booking platform.

## Setup

```bash
npm install
```

Edit `.env` and point `VITE_API_BASE_URL` to your running QuickTurf backend (default: `http://localhost:8000`).

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Routes

- `/` — Home, FIFA-style dark variant (cinematic hero, stat ticker, sport category tiles, scrolling news cards)
- `/home-classic` — Home, original light theme
- `/book` — Pick a sport, browse turfs offering it
- `/turfs` — Browse all turfs
- `/turfs/:turfId` — Turf detail, pick sport/date/slot
- `/turfs/:turfId/book` — Confirm booking (name, phone, email, paid amount, notes)
- `/invoice/:bookingId` — Booking confirmation + invoice download
- `/admin/login`, `/admin/turfs`, `/admin/bookings` — QuickTurf platform admin
- `/turf-admin/login`, `/turf-admin/dashboard`, `/turf-admin/sports`, `/turf-admin/time-slots`,
  `/turf-admin/packages`, `/turf-admin/memberships`, `/turf-admin/bookings`, `/turf-admin/settings` — Turf admin

## Color palette (from QuickTurf emblem)

- Green `#3CA458` — accents, active/available states, money paid
- Navy `#16225C` — primary brand, nav, slot grid background
- Red `#D32F2F` — due amounts, suspended/cancelled states
- Charcoal `#3A3A3C` — body text
- Mist `#F4F5F7` — section backgrounds

## Notes

- All API calls in `src/api` map 1:1 to the FastAPI backend routes.
- Platform admin and turf admin use separate JWTs (`qt_platform_token`, `qt_turf_token` in localStorage) since they're independent auth domains on the backend.
- `/` uses hand-drawn original SVG illustrations (`src/assets/illustrations`) for the hero, sport tiles, and news cards by default — no stock photos, no third-party copyrighted imagery.
- The hero supports a looped, muted, autoplaying video background. Drop an `.mp4` at `src/assets/video/hero.mp4` (see the README in that folder for a verified free-license source and recommended specs) — `HeroSection` automatically falls back to the SVG illustration if the file is missing, so the page never breaks.
- To swap any SVG illustration for a real photo, see `src/assets/photos/README.txt` for verified Pexels source links and the one-line import change needed in `HomePageV2.jsx`.
