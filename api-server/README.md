# Movies API (Express)

This is a minimal Express API for movies. It uses a local JSON file as the data store (`data/movies.json`).

Endpoints
- GET /movies — list movies
- GET /movies/:id — get a movie by id
- POST /movies — create a movie (body: { title, year, director, description })

Run locally

```powershell
cd C:\Users\Carlos\Desktop\banco\api-server
npm install
# dev mode with auto-reload
npm run dev
# or production
npm start
```

Environment
- PORT (optional) — default 3333

Persistence
- The API persists data to `data/movies.json` (file-backed storage). No MongoDB or external database is required.

Quick test (Insomnia / Postman)

1) Start the server

```powershell
cd C:\Users\Carlos\Desktop\banco\api-server
npm install
npm start
```

2) Requests

- GET list of movies
  - Method: GET
  - URL: http://localhost:3333/movies

- Create a movie
  - Method: POST
  - URL: http://localhost:3333/movies
  - Body (JSON):
    {
      "title": "Teste via Insomnia",
      "year": 2025,
      "director": "Seu Nome",
      "description": "Descrição de teste"
    }

3) Notes
- The API will persist changes to `data/movies.json`. If you need a stateless demo, I can add a /reset endpoint that restores the initial sample data.


