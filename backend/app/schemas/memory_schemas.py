from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field


class MemoryCreateRequest(BaseModel):
    workspace_id: UUID
    content: str = Field(..., min_length=1)
    memory_type: str = "fact"
    document_source: Optional[str] = None
    chunk_id: Optional[int] = None
    importance: float = Field(default=0.5, ge=0.0, le=1.0)


class MemoryCreateResponse(BaseModel):
    memory_id: str
    status: str


class MemorySearchRequest(BaseModel):
    workspace_id: UUID
    query: str = Field(..., min_length=1)
    limit: int = Field(default=5, ge=1, le=50)
    memory_type: Optional[str] = None


class MemoryResult(BaseModel):
    memory_id: UUID
    workspace_id: UUID
    content: str
    memory_type: str
    document_source: Optional[str] = None
    chunk_id: Optional[int] = None
    importance: float
    status: str
    distance: Optional[float] = None


class MemoryStatusUpdateRequest(BaseModel):
    status: str


class StatusUpdateResponse(BaseModel):
    memory_id: str
    status: str