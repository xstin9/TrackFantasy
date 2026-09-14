# TrackFantasy — MVP v0.1

Fantasy athletics: draft real sprinters/hurdlers/jumpers on a budget, earn points
off their actual results, compete on a private league leaderboard.

Independent project — not affiliated with or endorsed by any athletics
federation, meeting organiser, or governing body. Names/marks used are public
performance information; prices are our own fantasy invention.

## Stack
React + TypeScript + Vite + Tailwind v4 + react-router-dom. Data layer is
mocked with `localStorage` tonight, shaped so it's a near drop-in swap for
Firestore later (see below).

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
```

## What's built
- **Home** — pitch + link into the flow
- **Choose competition** — pick a meet (`src/data/competitions.ts`)
- **Draft** — budget bar, squad-size cap, filter by event group
  (`src/pages/Draft.tsx`)
- **My Team** — roster + live points breakdown per athlete
- **Leaderboard** — ranked by total points, filterable by private league code
- **Scoring engine** — `src/lib/scoring.ts`: place points, season-best bonus,
  national record bonus, DNF/DQ penalties
- **Private leagues** — a 6-char code generated per team; join by entering the
  same code when you save your draft (`src/lib/storage.ts`)

## Data model
See `src/types.ts`. Mock athlete pool and one competition
("Golden Spike Meeting" — deliberately not "Diamond League" or any real
branded series name) live in `src/data/`. Swap/expand these freely — that's
the whole point of tonight's build being data-driven rather than hardcoded
into components.

## Swapping mock storage for Firebase
Everything that touches persistence goes through `teamsRepo` in
`src/lib/storage.ts`. To go live:

1. `npm install firebase`
2. Create a Firebase project → Firestore + (optionally) Anonymous or
   Email auth.
3. Add `src/lib/firebase.ts`:
   ```ts
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';

   const app = initializeApp({
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     // ...rest of your config
   });
   export const db = getFirestore(app);
   ```
4. Put your keys in `.env.local` (never commit this) as `VITE_FIREBASE_*`.
5. Reimplement each method in `teamsRepo` using `addDoc` / `getDocs` /
   `deleteDoc` against a `teams` collection instead of `localStorage`. The
   method signatures in `Draft.tsx`, `MyTeam.tsx`, and `Leaderboard.tsx` don't
   need to change — they just call `teamsRepo.create(...)`,
   `teamsRepo.list()`, etc.
6. For real-time leaderboards, swap `teamsRepo.list()` for an
   `onSnapshot` listener behind the same interface.

## Naming / IP notes (carried over from tonight's chat)
- App name and branding are our own — don't reuse a federation/meeting's
  name or logo.
- Athlete photos aren't included; avatars/initials only until photos are
  properly licensed.
- Results data is hand-entered mock data tonight, not scraped from any
  official database.
- Before charging money or signing partnerships, get a proper trademark
  search on the final name and run the product past an IP lawyer.

## Tomorrow
Get one real athletics person to draft a team and react. Don't polish past
that.
