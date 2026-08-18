from uuid import UUID, uuid4

from relay_agent.contracts import (
    ActionType,
    AgentRequest,
    MemoryStatus,
    ProposedAction,
)
from relay_agent.domain import (
    DecisionRecord,
    DecisionStatus,
    MemorySearchResult,
    ModelOutput,
    TaskRecord,
    TaskStatus,
)
from relay_agent.orchestrator import AgentOrchestrator


class FakeEmbedder:
    def embed(self, text: str) -> list[float]:
        return [0.1, 0.2, 0.3]


class FakeRepository:
    def semantic_search(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        query_embedding: list[float],
        limit: int,
    ) -> list[MemorySearchResult]:
        return [
            MemorySearchResult(
                memory_id=uuid4(),
                title="Vendor Alpha Review",
                content="Vendor Alpha failed the compliance assessment.",
                source_uri="s3://relay/vendor-alpha.txt",
                status=MemoryStatus.ACTIVE,
                similarity_score=0.95,
            )
        ]

    def get_pending_tasks(
        self,
        *,
        workspace_id: UUID,
        project_id: UUID,
        limit: int,
    ) -> list[TaskRecord]:
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
        return [
            DecisionRecord(
                decision_id=uuid4(),
                title="Reject Vendor Alpha",
                rationale="Compliance requirements were not satisfied.",
                status=DecisionStatus.ACTIVE,
                source_uri="s3://relay/vendor-alpha.txt",
            )
        ]


class FakeModel:
    def __init__(self) -> None:
        self.received_message: str | None = None
        self.received_context: str | None = None

    def generate(
        self,
        *,
        user_message: str,
        grounding_context: str,
    ) -> ModelOutput:
        self.received_message = user_message
        self.received_context = grounding_context

        return ModelOutput(
            answer="Vendor Alpha was rejected because it failed compliance.",
            proposed_actions=[
                ProposedAction(
                    action_type=ActionType.CREATE_TASK,
                    payload={
                        "title": "Complete vendor security review",
                    },
                )
            ],
        )


def make_request() -> AgentRequest:
    return AgentRequest(
        workspace_id=uuid4(),
        project_id=uuid4(),
        user_id=uuid4(),
        conversation_id=uuid4(),
        message="Why was Vendor Alpha rejected?",
    )


def test_orchestrator_runs_complete_agent_workflow() -> None:
    model = FakeModel()

    orchestrator = AgentOrchestrator(
        repository=FakeRepository(),
        embedder=FakeEmbedder(),
        model=model,
    )

    request = make_request()
    response = orchestrator.answer(request)

    assert response.answer == (
        "Vendor Alpha was rejected because it failed compliance."
    )

    assert len(response.citations) == 1
    assert response.citations[0].title == "Vendor Alpha Review"
    assert response.citations[0].status == MemoryStatus.ACTIVE

    assert len(response.proposed_actions) == 1
    assert response.proposed_actions[0].requires_confirmation is True
    assert response.proposed_actions[0].action_type == ActionType.CREATE_TASK

    assert response.tool_trace == [
        "semantic_search",
        "get_pending_tasks",
        "get_decision_history",
        "reasoning_model",
    ]

    assert model.received_message == request.message
    assert model.received_context is not None
    assert "Vendor Alpha Review" in model.received_context
    assert "Complete vendor security review" in model.received_context
    assert "Reject Vendor Alpha" in model.received_context


def test_orchestrator_creates_memory_citation_excerpt() -> None:
    orchestrator = AgentOrchestrator(
        repository=FakeRepository(),
        embedder=FakeEmbedder(),
        model=FakeModel(),
    )

    response = orchestrator.answer(make_request())

    assert response.citations[0].excerpt == (
        "Vendor Alpha failed the compliance assessment."
    )
