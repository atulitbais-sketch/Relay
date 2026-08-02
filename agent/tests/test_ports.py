from uuid import UUID, uuid4

import pytest
from pydantic import ValidationError

from relay_agent.contracts import MemoryStatus
from relay_agent.domain import (
    DecisionRecord,
    DecisionStatus,
    MemorySearchResult,
    TaskRecord,
    TaskStatus,
)
from relay_agent.ports import Embedder, MemoryRepository


class FakeEmbedder:
    def embed(self, text: str) -> list[float]:
        return [0.1, 0.2, 0.3]


class FakeMemoryRepository:
    def semantic_search(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        query_embedding: list[float],
        limit: int,
    ) -> list[MemorySearchResult]:
        return []

    def get_pending_tasks(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        limit: int,
    ) -> list[TaskRecord]:
        return []

    def get_decision_history(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        limit: int,
    ) -> list[DecisionRecord]:
        return []


def test_fake_embedder_matches_protocol() -> None:
    assert isinstance(FakeEmbedder(), Embedder)


def test_fake_repository_matches_protocol() -> None:
    assert isinstance(FakeMemoryRepository(), MemoryRepository)


def test_memory_similarity_must_be_between_zero_and_one() -> None:
    with pytest.raises(ValidationError):
        MemorySearchResult(
            memory_id=uuid4(),
            title="Invalid memory",
            content="Test content",
            source_uri="s3://relay/test.txt",
            status=MemoryStatus.ACTIVE,
            similarity_score=1.5,
        )


def test_domain_records_can_be_created() -> None:
    task = TaskRecord(
        task_id=uuid4(),
        title="Complete security review",
        status=TaskStatus.PENDING,
    )

    decision = DecisionRecord(
        decision_id=uuid4(),
        title="Reject Vendor Alpha",
        rationale="The vendor failed the security review.",
        status=DecisionStatus.ACTIVE,
        source_uri="s3://relay/vendor-review.txt",
    )

    assert task.status == TaskStatus.PENDING
    assert decision.status == DecisionStatus.ACTIVE
