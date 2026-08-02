"""Hybrid semantic and relational retrieval for Relay."""

from relay_agent.contracts import AgentRequest
from relay_agent.domain import RetrievalContext
from relay_agent.ports import Embedder, MemoryRepository


class HybridRetriever:
    """Retrieve semantic memories and exact structured project state."""

    def __init__(
        self,
        *,
        repository: MemoryRepository,
        embedder: Embedder,
        semantic_limit: int = 6,
        structured_limit: int = 20,
    ) -> None:
        if semantic_limit < 1:
            raise ValueError("semantic_limit must be at least 1")

        if structured_limit < 1:
            raise ValueError("structured_limit must be at least 1")

        self._repository = repository
        self._embedder = embedder
        self._semantic_limit = semantic_limit
        self._structured_limit = structured_limit

    def retrieve(self, request: AgentRequest) -> RetrievalContext:
        """Build the complete context required by the agent."""

        query_embedding = self._embedder.embed(request.message)

        if not query_embedding:
            raise ValueError("Embedder returned an empty vector")

        memories = self._repository.semantic_search(
            workspace_id=request.workspace_id,
            project_id=request.project_id,
            query_embedding=query_embedding,
            limit=self._semantic_limit,
        )

        pending_tasks = self._repository.get_pending_tasks(
            workspace_id=request.workspace_id,
            project_id=request.project_id,
            limit=self._structured_limit,
        )

        decisions = self._repository.get_decision_history(
            workspace_id=request.workspace_id,
            project_id=request.project_id,
            limit=self._structured_limit,
        )

        return RetrievalContext(
            memories=memories,
            pending_tasks=pending_tasks,
            decisions=decisions,
        )
