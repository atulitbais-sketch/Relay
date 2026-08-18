"""Main orchestration workflow for the Relay agent."""

from relay_agent.context import build_grounding_context
from relay_agent.contracts import AgentRequest, AgentResponse, Citation
from relay_agent.ports import Embedder, MemoryRepository, ReasoningModel
from relay_agent.retrieval import HybridRetriever


class AgentOrchestrator:
    """Coordinate retrieval, grounding, reasoning, and response creation."""

    def __init__(
        self,
        *,
        repository: MemoryRepository,
        embedder: Embedder,
        model: ReasoningModel,
        semantic_limit: int = 6,
        structured_limit: int = 20,
    ) -> None:
        self._retriever = HybridRetriever(
            repository=repository,
            embedder=embedder,
            semantic_limit=semantic_limit,
            structured_limit=structured_limit,
        )
        self._model = model

    def answer(self, request: AgentRequest) -> AgentResponse:
        """Answer a user request using enterprise memory and project state."""

        retrieval_context = self._retriever.retrieve(request)

        grounding_context = build_grounding_context(retrieval_context)

        model_output = self._model.generate(
            user_message=request.message,
            grounding_context=grounding_context,
        )

        citations = [
            Citation(
                memory_id=memory.memory_id,
                title=memory.title,
                source_uri=memory.source_uri,
                status=memory.status,
                excerpt=memory.content[:300],
            )
            for memory in retrieval_context.memories
        ]

        return AgentResponse(
            answer=model_output.answer,
            citations=citations,
            proposed_actions=model_output.proposed_actions,
            tool_trace=[
                "semantic_search",
                "get_pending_tasks",
                "get_decision_history",
                "reasoning_model",
            ],
        )
