# Relay Integrated Backend

This backend connects the React frontend, Relay API, and the `relay_agent` core in one process.

## Run

PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

Then in a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Agent modes

`USE_MOCK_AGENT=true` is the default and requires no AWS account or local LLM.

To use Bedrock, set:

```env
USE_MOCK_AGENT=false
AWS_REGION=ap-south-1
BEDROCK_MODEL_ID=your-model-id
```

The API converts the frontend's human-readable project IDs to the UUID-based agent-core contract internally.

## Important

The old CockroachDB-only memory service from the separate agent repository is preserved as reference in the original ZIP, but the integrated app uses one application repository adapter so the frontend, API and agent share the same data source. This makes local development deterministic. A production CockroachDB adapter can replace `InMemoryAgentRepository` without changing the agent contracts.
