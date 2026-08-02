"""Interfaces required by the Relay agent."""

from typing import Protocol, runtime_checkable
from uuid import UUID

from relay_agent.domain import (
    DecisionRecord,
    MemorySearchResult,
    TaskRecord,
)


@runtime_checkable
class Embedder(Protocol):
    """Converts text into a vector embedding."""

    def embed(self, text: str) -> list[float]:
        """Return an embedding vector for the supplied text."""
        ...


@runtime_checkable
class MemoryRepository(Protocol):
    """Database operations required by the agent brain."""

    def semantic_search(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        query_embedding: list[float],
        limit: int,
    ) -> list[MemorySearchResult]:
        """Return semantically related active memories."""
        ...

    def get_pending_tasks(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        limit: int,
    ) -> list[TaskRecord]:
        """Return pending tasks for a project."""
        ...

    def get_decision_history(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        limit: int,
    ) -> list[DecisionRecord]:
        """Return the project decision history."""
        ...
