# Relay — Integrated Build

This is the merged build created from:

- `Relay-feature-agent-core.zip` — agent core
- `Relay-main.zip` — React frontend
- `relay.zip` — FastAPI backend

## Architecture

```text
React frontend
      |
      | HTTP /api/*
      v
FastAPI backend
      |
      v
relay_agent AgentOrchestrator
      |
      +--> semantic retrieval
      +--> pending tasks
      +--> decision history
      +--> reasoning model
      |
      v
Shared application data store
```

The default development mode is fully local and does not require AWS or CockroachDB.

## Start backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

## Start frontend

Open another PowerShell window:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

## API

- `GET /health`
- `POST /api/chat/message`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/{id}`
- `GET /api/documents`
- `POST /api/documents/upload`
- `GET /api/conflicts`
- `POST /api/conflicts/{id}/resolve`
- `POST /api/actions/{id}/confirm`
- `GET /api/dashboard/stats`

## Production migration

The local adapter is deliberately simple so the complete application can run first. For production, replace `InMemoryAgentRepository` with the CockroachDB repository and configure Bedrock/S3.

## Documents: upload and new-file support

The Documents page now loads documents from `GET /api/documents`, supports browser uploads for
`.txt`, `.md`, `.pdf`, and `.docx`, and provides a **New File** workflow for `.txt`/`.md`.
Uploaded PDF/DOCX content is extracted before indexing, so it is searchable by the Relay agent.
The page also supports deleting documents.

Start the backend first, then run the frontend with `npm install` and `npm run dev`.
