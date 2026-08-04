from typing import List
from fastapi import APIRouter, HTTPException, Query

from app.schemas.memory_schemas import (
    MemoryCreateRequest,
    MemoryCreateResponse,
    MemorySearchRequest,
    MemoryResult,
    MemoryStatusUpdateRequest,
    StatusUpdateResponse,
)
from app.services.memory_service import MemoryService

router = APIRouter(prefix="/memory", tags=["memory"])


@router.post("", response_model=MemoryCreateResponse)
async def create_memory(payload: MemoryCreateRequest):
    try:
        return await MemoryService.create_memory(
            workspace_id=str(payload.workspace_id),
            content=payload.content,
            memory_type=payload.memory_type,
            document_source=payload.document_source,
            chunk_id=payload.chunk_id,
            importance=payload.importance,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save memory: {e}")


@router.post("/search", response_model=List[MemoryResult])
async def search_memory(payload: MemorySearchRequest):
    try:
        return await MemoryService.search_memories(
            workspace_id=str(payload.workspace_id),
            query=payload.query,
            limit=payload.limit,
            memory_type=payload.memory_type,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")


@router.get("/active", response_model=List[MemoryResult])
async def active_memory(
    workspace_id: str = Query(...),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
):
    try:
        return await MemoryService.list_active_memories(workspace_id, limit, offset)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch memories: {e}")


@router.patch("/{memory_id}/status", response_model=StatusUpdateResponse)
async def update_status(memory_id: str, payload: MemoryStatusUpdateRequest):
    try:
        updated = await MemoryService.change_status(memory_id, payload.status)
        if not updated:
            raise HTTPException(status_code=404, detail="Memory not found")
        return {"memory_id": memory_id, "status": payload.status}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))