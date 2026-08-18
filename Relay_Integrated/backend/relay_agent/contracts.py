"""Shared input and output contracts for the Relay agent."""

from enum import StrEnum
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class StrictModel(BaseModel):
    """Base model that rejects unknown fields."""

    model_config = ConfigDict(extra="forbid")


class MemoryStatus(StrEnum):
    PENDING = "pending"
    ACTIVE = "active"
    DISPUTED = "disputed"
    SUPERSEDED = "superseded"
    REJECTED = "rejected"
    ARCHIVED = "archived"


class ActionType(StrEnum):
    CREATE_TASK = "create_task"


class AgentRequest(StrictModel):
    """Request received by the agent from the backend."""

    workspace_id: UUID
    project_id: UUID
    user_id: UUID
    conversation_id: UUID
    message: str = Field(min_length=1, max_length=10_000)


class Citation(StrictModel):
    """A memory source supporting an agent answer."""

    memory_id: UUID
    title: str
    source_uri: str
    status: MemoryStatus
    excerpt: str | None = None


class ProposedAction(StrictModel):
    """An action proposed by the agent but not yet executed."""

    action_type: ActionType
    requires_confirmation: bool = True
    payload: dict[str, Any]


class AgentResponse(StrictModel):
    """Final structured response returned by the agent."""

    answer: str
    citations: list[Citation] = Field(default_factory=list)
    proposed_actions: list[ProposedAction] = Field(default_factory=list)
    tool_trace: list[str] = Field(default_factory=list)
