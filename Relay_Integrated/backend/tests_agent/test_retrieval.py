from uuid import UUID, uuid4

import pytest

from relay_agent.contracts import AgentRequest, MemoryStatus
from relay_agent.domain import (
    DecisionRecord,
    DecisionStatus,
    MemorySearchResult,
    TaskRecord,
    TaskStatus,
)
from relay_agent.retrieval import HybridRetriever


class RecordingEmbedder:
    def __init__(self, vector: list[float] | None = None) -> None:
        self.vector = vector if vector is not None else [0.1, 0.2, 0.3]
        self.received_text: str | None = None

    def embed(self, text: str) -> list[float]:
        self.received_text = text
        return self.vector


class RecordingRepository:
    def __init__(self) -> None:
        self.semantic_call: dict[str, object] | None = None
        self.task_call: dict[str, object] | None = None
        self.decision_call: dict[str, object] | None = None

    def semantic_search(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        query_embedding: list[float],
        limit: int,
    ) -> list[MemorySearchResult]:
        self.semantic_call = {
            "workspace_id": workspace_id,
            "project_id": project_id,
            "query_embedding": query_embedding,
            "limit": limit,
        }

        return [
            MemorySearchResult(
                memory_id=uuid4(),
                title="Vendor Alpha Review",
                content="Vendor Alpha failed the compliance review.",
                source_uri="s3://relay/vendor-alpha.txt",
                status=MemoryStatus.ACTIVE,
                similarity_score=0.94,
            )
        ]

    def get_pending_tasks(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        limit: int,
    ) -> list[TaskRecord]:
        self.task_call = {
            "workspace_id": workspace_id,
            "project_id": project_id,
            "limit": limit,
        }

        return [
            TaskRecord(
                task_id=uuid4(),
                title="Complete vendor security review",
                status=TaskStatus.PENDING,
            )
        ]

    def get_decision_history(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        limit: int,
    ) -> list[DecisionRecord]:
        self.decision_call = {
            "workspace_id": workspace_id,
            "project_id": project_id,
            "limit": limit,
        }

        return [
            DecisionRecord(
                decision_id=uuid4(),
                title="Reject Vendor Alpha",
                rationale="Compliance requirements were not satisfied.",
                status=DecisionStatus.ACTIVE,
                source_uri="s3://relay/vendor-alpha.txt",
            )
        ]


def make_request() -> AgentRequest:
    return AgentRequest(
        workspace_id=uuid4(),
        project_id=uuid4(),
        user_id=uuid4(),
        conversation_id=uuid4(),
        message="Why was Vendor Alpha rejected?",
    )


def test_hybrid_retriever_combines_all_context() -> None:
    request = make_request()
    embedder = RecordingEmbedder()
    repository = RecordingRepository()

    retriever = HybridRetriever(
        repository=repository,
        embedder=embedder,
        semantic_limit=5,
        structured_limit=10,
    )

    context = retriever.retrieve(request)

    assert len(context.memories) == 1
    assert len(context.pending_tasks) == 1
    assert len(context.decisions) == 1

    assert embedder.received_text == request.message
    assert repository.semantic_call == {
        "workspace_id": request.workspace_id,
        "project_id": request.project_id,
        "query_embedding": [0.1, 0.2, 0.3],
        "limit": 5,
    }
    assert repository.task_call == {
        "workspace_id": request.workspace_id,
        "project_id": request.project_id,
        "limit": 10,
    }
    assert repository.decision_call == {
        "workspace_id": request.workspace_id,
        "project_id": request.project_id,
        "limit": 10,
    }


def test_empty_embedding_is_rejected() -> None:
    retriever = HybridRetriever(
        repository=RecordingRepository(),
        embedder=RecordingEmbedder(vector=[]),
    )

    with pytest.raises(ValueError, match="empty vector"):
        retriever.retrieve(make_request())


def test_invalid_limits_are_rejected() -> None:
    with pytest.raises(ValueError, match="semantic_limit"):
        HybridRetriever(
            repository=RecordingRepository(),
            embedder=RecordingEmbedder(),
            semantic_limit=0,
        )

    with pytest.raises(ValueError, match="structured_limit"):
        HybridRetriever(
            repository=RecordingRepository(),
            embedder=RecordingEmbedder(),
            structured_limit=0,
        )
