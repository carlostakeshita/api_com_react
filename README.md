# Movies Front-end (Next.js)

This is a minimal Next.js front-end intended to list movies from the API you created previously.

Features
- List movies using React components
- Organized into components with CSS Modules
- Configurable API URL via environment variable

Assumptions
- The movies API endpoint returns a JSON array of movie objects, e.g. [{ id, title, year, director, description }, ...].
- By default the app will request the built-in endpoint: /api/movies (served by Next.js). Override with NEXT_PUBLIC_API_URL if you want to point the front-end to an external API (for example http://localhost:3333/movies).

Local API

The project includes a simple mock API at `pages/api/movies.js` which returns a small list of sample Brazilian films. This is provided so the front-end works immediately after installing and running the dev server.

Example response shape:

```json
[ { "id": "1", "title": "Cidade de Deus", "year": 2002, "director": "...", "description": "..." }, ... ]
```

Quick start

1. Install dependencies

```powershell
cd C:\Users\Carlos\Desktop\banco
npm install
```

2. Run dev server

```powershell
# optionally set the API URL and run
$env:NEXT_PUBLIC_API_URL = "http://localhost:3001/api/movies"; npm run dev
# or
npm run dev
```

Open http://localhost:3000

Notes
- The code fetches data client-side (useEffect). If you prefer SSR, we can switch to getServerSideProps.
- If your API uses different field names, the MovieItem component attempts to support some common variants (title/name, year/releaseYear, description/overview).
