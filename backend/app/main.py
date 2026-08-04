from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.db.connection import connect_db, disconnect_db
from app.api.memory_routes import router as memory_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await disconnect_db()


app = FastAPI(title="Relay Memory Service", lifespan=lifespan)

app.include_router(memory_router)


@app.get("/health")
async def health():
    return {"status": "ok"}