Netlify deploy notes for this monorepo

Overview
- Frontend lives in `frontend/` and uses Vite.
- Backend lives in `backend/` and can serve the built frontend (backend serves `frontend/dist` when present).
- We configure Netlify to run the root `npm run build` which installs frontend deps and builds the frontend.

Recommended Netlify settings (repo root with `netlify.toml`)
- Build command: `npm run build`
- Publish directory: `frontend/dist`

Alternative (set Base directory to `frontend`)
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`

Important notes
- Root `package.json` includes an `install:all` script that prefers `npm ci` and falls back to `npm install`:
  - `npm ci --prefix frontend || npm install --prefix frontend && npm ci --prefix backend || npm install --prefix backend`
- The root `build` script runs `npm run install:all` then `npm run build --prefix frontend` so Netlify will install the frontend's devDependencies (including `vite`) before building.

Environment variables (Netlify UI → Site settings → Build & deploy → Environment):
- `VITE_API_BASE_URL` = the backend URL (e.g., `https://resume-backend.onrender.com`) if your frontend calls the backend API.

If you deploy the backend separately (Render/Railway/Heroku):
- Set `CORS_ORIGIN` on the backend to the Netlify site URL (e.g., `https://your-site.netlify.app`).

Local test commands
- Build frontend only:

```powershell
npm run build --prefix frontend
```

- Install everything and build (same as Netlify root `build`):

```powershell
npm run build
```

- Start the backend serving the built frontend (production-like):

```powershell
npm run start:prod
# or
npm run build --prefix frontend
node backend/src/server.js
```

- Dev (hot reload for both):

```powershell
npm run dev
```

Troubleshooting
- If Netlify fails with `vite: not found`, confirm the root `build` script installs frontend deps before building (we already added this). If you decided to use the `frontend` base directory, Netlify will run install in that directory automatically.
- If using `npm ci` and you don't have `package-lock.json` files, `npm ci` will fail and the script falls back to `npm install`.

Optional improvements
- Add `engines.node` or a `.nvmrc` to lock Node version used by Netlify.
- Use `npm ci` only when lockfiles exist for faster, deterministic installs.

If you'd like, I can add a short README section to the main `README.md` instead of a separate file, and/or add `.nvmrc` or `engines` to `package.json`.
