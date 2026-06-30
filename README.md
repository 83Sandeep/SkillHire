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

CI / Automated E2E
------------------

This repository includes a GitHub Actions workflow that runs an end-to-end AI smoke test.

- Workflow: [.github/workflows/e2e-ai-ci.yml](.github/workflows/e2e-ai-ci.yml)
- CI runner script: `scripts/run_e2e_ai_ci.py` — runs `e2e_ai_test.py` multiple times and writes per-run logs to `logs/e2e_ai_runs/`.

Required GitHub Secrets (set in repository Settings → Secrets):
- `JWT_SECRET`
- `MONGO_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Run CI locally (quick):

1. Ensure services are available (or let Docker Compose build them):
```bash
# with docker-compose
docker compose up --build -d

# or start services manually in separate terminals
# server: cd server && npm install && npm run dev
# python-ai: cd python-ai && python -m pip install -r requirements.txt && python -m uvicorn main:app --reload --port 8000
```

2. Run the CI wrapper (example runs=3):
```bash
python scripts/run_e2e_ai_ci.py --runs 3
```

Artifacts and logs are written to `logs/e2e_ai_runs/` by default.

If you want the workflow to run in GitHub Actions, add the required repository secrets and trigger the workflow from the Actions tab or push to `main`.

