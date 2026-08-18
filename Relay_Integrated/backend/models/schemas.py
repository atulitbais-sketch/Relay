from typing import Any, Optional
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    project_id: str = "nexora"
    message: str = Field(min_length=1, max_length=10000)
    conversation_id: str = "default"
    user_id: str = "demo-user"

class Citation(BaseModel):
    document_id: Optional[str] = None
    document_name: Optional[str] = None
    memory_id: Optional[str] = None
    status: str = "active"
    snippet: Optional[str] = None

class ProposedAction(BaseModel):
    action_id: str
    action_type: str
    title: str
    description: Optional[str] = None
    payload: dict[str, Any] = Field(default_factory=dict)

class ChatResponse(BaseModel):
    answer: str
    citations: list[Citation] = Field(default_factory=list)
    proposed_action: Optional[ProposedAction] = None

class Task(BaseModel):
    id: str
    project_id: str
    title: str
    description: Optional[str] = None
    status: str = "pending"
    priority: str = "medium"

class TaskCreate(BaseModel):
    project_id: str = "nexora"
    title: str = Field(min_length=1)
    description: str = ""
    priority: str = "medium"

class TaskUpdate(BaseModel):
    status: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None

class Conflict(BaseModel):
    id: str
    project_id: str
    old_memory_id: Optional[str] = None
    new_memory_id: Optional[str] = None
    description: str
    status: str = "unresolved"

class ConflictResolve(BaseModel):
    resolution: str = ""

class ActionConfirmationRequest(BaseModel):
    action_type: str = "CREATE_TASK"
    project_id: str = "nexora"
    title: str = "Complete security review"
    priority: str = "high"

class ActionConfirmationResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict[str, Any]] = None

class DocumentCreate(BaseModel):
    project_id: str = "nexora"
    name: str = Field(min_length=1, max_length=255)
    content: str = ""
    category: str = "General"

class PresignRequest(BaseModel):
    project_id: str = "nexora"
    filename: str
    content_type: str = "text/plain"

class PresignResponse(BaseModel):
    document_id: str
    upload_url: str
    object_key: str

class Document(BaseModel):
    id: str
    project_id: str
    name: str
    type: str = "txt"
    category: str = "General"
    size: str = "0 KB"
    status: str = "indexed"
