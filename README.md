# Blog App

A full‑stack notes / blog management application built with React (Vite) on the frontend and Node.js + Express + MongoDB on the backend.

---

## What I implemented ✅

- Full authentication flow: sign‑up, sign‑in, JWT issuance, protected routes and token validation.
- Persistent login on refresh: `UserProvider` fetches userData from `GET /users/userData` and `ProtectRoutes` waits for the provider to finish loading before redirecting (prevents the "redirect-to-sign-in-on-refresh" issue).
- Notes CRUD: create, update, soft‑delete (recoverable), permanent delete, mark-as-checked, and filtered views for active/checked/deleted notes.
- User profile: view & edit profile, gender selection, profile avatar logic.
- Responsive UI: NavBar, SideBar, mobile layout and accessible components (OverlayModal, UpdateForm, Google sign-in button UI).
- Server-side validation, secure password hashing, JWT middleware and centralized error handling.

---

## Quick project map (key files you worked on)

- Frontend
  - `src/userContext.jsx` — React context for `user`
  - `src/userData.jsx` — fetches authenticated user + provides `loading`
  - `src/ProtectRoutes.jsx` — blocks routes until `loading` finishes
  - `src/Components/*` — NavBar, SideBar, Footer, OverlayModal, UpdateForm, Google Button
  - `src/Signing/*` — `SignUp.jsx`, `SignIn.jsx`
  - `src/Home/*` — `Home.jsx`, `Checked.jsx`, `Deleted.jsx`, `Profile.jsx`
  - `src/Services/*` — front-end API wrappers (`notes.service.js`, `users.service.js`)

- Backend
  - `Src/Modules/Auth/*` — `auth.controller.js`, `auth.service.js` (signup/signin)
  - `Src/Modules/Notes/*` — notes controller/service
  - `Src/Modules/Users/*` — user service/controller
  - `Src/Common/Middlewares/*` — `auth.middleware.js`, `error.middleware.js`
  - `Src/DB/models/*` — `users.model.js`, `notes.model.js`
  - `Src/Common/Utils/*` — `jwt.utils.js`, `hash.utils.js`, `encrypt.utils.js`, `res.utils.js`

---

## Features (detailed)

- Authentication: JWT stored in `localStorage`, token verified on each protected request.
- Route protection: protected client routes (`/profile`, `/notes/*`) guarded by `ProtectRoutes`.
- Notes: add, edit, soft-delete (recover), hard delete, mark completed/checked.
- Profile: edit user info and gender; UI shows avatar by gender.
- UX: loading state for auth on app init (prevents flash/redirect), responsive layout, accessible modal.

---

## How to run (development)

1. Start MongoDB (local or cloud).
2. Start backend:

```bash
cd Server
pnpm install
cp .env.example .env   # add your values
pnpm run dev
```

3. Start frontend:

```bash
cd Client
pnpm install
cp .env.example .env   # set VITE_API_URL
pnpm run dev
```

Visit `http://localhost:5173` (frontend) and `http://localhost:5000` (API) by default.

---

## API (summary)

- POST `/auth/signUp` — register
- POST `/auth/signIn` — login (returns JWT)
- GET `/users/userData` — return current user (requires Authorization header)
- PUT `/users/profile` — update profile
- Notes endpoints: `GET /notes`, `POST /notes`, `PUT /notes/:id`, `DELETE /notes/:id`, `GET /notes/checked`, `GET /notes/deleted`

---

## Recent changes / important fixes 🔧

- Fixed: page refresh immediately redirected to sign-in. Added `loading` state in `UserProvider` (`src/userData.jsx`) and updated `ProtectRoutes.jsx` to wait for loading before redirecting — fixes persistent-auth UX.
- Implemented: soft-delete + recovery for notes and protected route handling.

---

## How to manually verify core flows (smoke tests) 🧪

1. Sign up a new user → you'll receive a JWT and be redirected to the dashboard.
2. Create, edit, mark-checked, and delete a note. Visit `Deleted` to restore.
3. Edit your profile and change gender — verify avatar updates.
4. Refresh the browser on any protected route — you should remain signed in (no premature redirect).

---

## Screenshots

### Sign In
![Sign In Page](screenshots/signin.png)

### Sign Up
![Sign Up Page](screenshots/signup.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Profile
![User Profile](screenshots/profile.png)

---

## Author

Diaa El‑Din Hassan

## License

ISC

