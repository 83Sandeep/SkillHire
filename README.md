# SkillHire

Local development and quick start

Prerequisites:
- Node.js 18+ and npm
- Python 3.10+
- MongoDB running locally (or set `MONGO_URI` to your hosted DB)

Run services locally (development):

1) Server
```bash
cd server
npm install
npm run dev
```

2) Client
```bash
cd Client
npm install
npm run dev
```

3) Python AI
```bash
cd python-ai
python -m pip install -r requirements.txt
uvicorn main:app --app-dir . --reload --host 0.0.0.0 --port 8000
```

Or run everything with Docker Compose:

```bash
# copy .env.example to .env and set secrets
docker compose up --build
```

Environment variables: see `.env.example`.

Notes:
- The backend exposes cookie-based auth at `/api/auth` and the frontend uses `withCredentials: true` for requests.
- The backend forwards resume files to the Python AI service at the `AI_SERVICE_URL`.
