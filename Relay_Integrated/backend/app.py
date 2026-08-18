from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from routes.chat import router as chat_router
from routes.documents import router as documents_router
from routes.tasks import router as tasks_router
from routes.conflicts import router as conflicts_router
from routes.actions import router as actions_router
from routes.dashboard import router as dashboard_router

app=FastAPI(title="Relay API",version="2.0.0",
            description="Integrated Relay frontend, backend and agent-core API")

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],
                   allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

@app.get("/health")
def health(): return {"status":"ok","service":"relay-integrated-backend","agent_core":"connected"}

@app.get("/")
def root(): return {"name":"Relay","status":"running","version":"2.0.0"}

app.include_router(chat_router)
app.include_router(documents_router)
app.include_router(tasks_router)
app.include_router(conflicts_router)
app.include_router(actions_router)
app.include_router(dashboard_router)
