"""Internal domain models used by the Relay agent."""

from enum import StrEnum
from uuid import UUID

from pydantic import Field

from relay_agent.contracts import MemoryStatus, StrictModel


class TaskStatus(StrEnum):
    """Supported task states."""

    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class DecisionStatus(StrEnum):
    """Supported decision states."""

    ACTIVE = "active"
    DISPUTED = "disputed"
    SUPERSEDED = "superseded"
    REJECTED = "rejected"


class MemorySearchResult(StrictModel):
    """A semantic memory returned by the database layer."""

    memory_id: UUID
    title: str
    content: str
    source_uri: str
    status: MemoryStatus
    similarity_score: float = Field(ge=0.0, le=1.0)


class TaskRecord(StrictModel):
    """A structured project task returned by the database layer."""

    task_id: UUID
    title: str
    status: TaskStatus
    owner_email: str | None = None


class DecisionRecord(StrictModel):
    """A structured project decision returned by the database layer."""

    decision_id: UUID
    title: str
    rationale: str
    status: DecisionStatus
    source_uri: str
