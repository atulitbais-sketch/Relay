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


class RetrievalContext(StrictModel):
    """Combined semantic and structured context for agent reasoning."""

    memories: list[MemorySearchResult] = Field(default_factory=list)
    pending_tasks: list[TaskRecord] = Field(default_factory=list)
    decisions: list[DecisionRecord] = Field(default_factory=list)


class ModelOutput(StrictModel):
    """Structured result returned by the reasoning model."""

    answer: str = Field(min_length=1)
    proposed_actions: list["ProposedAction"] = Field(default_factory=list)


from relay_agent.contracts import ProposedAction

ModelOutput.model_rebuild()
