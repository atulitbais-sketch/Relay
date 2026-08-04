from typing import Optional, List, Dict, Any

from app.repositories import memory_repository as repo
from app.services.embedding_service import EmbeddingService

_embedder = EmbeddingService()


class MemoryService:

    @staticmethod
    async def create_memory(
        workspace_id: str,
        content: str,
        memory_type: str = "fact",
        document_source: Optional[str] = None,
        chunk_id: Optional[int] = None,
        importance: float = 0.5,
    ) -> Dict[str, str]:
        embedding = _embedder.embed(content)
        memory_id = await repo.save_memory(
            workspace_id=workspace_id,
            content=content,
            memory_type=memory_type,
            embedding=embedding,
            document_source=document_source,
            chunk_id=chunk_id,
            importance=importance,
        )
        return {"memory_id": memory_id, "status": "created"}

    @staticmethod
    async def search_memories(
        workspace_id: str,
        query: str,
        limit: int = 5,
        memory_type: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        query_embedding = _embedder.embed(query)
        return await repo.semantic_search(
            workspace_id=workspace_id,
            query_embedding=query_embedding,
            limit=limit,
            memory_type=memory_type,
        )

    @staticmethod
    async def list_active_memories(
        workspace_id: str, limit: int = 100, offset: int = 0
    ) -> List[Dict[str, Any]]:
        return await repo.get_active_memories(workspace_id, limit, offset)

    @staticmethod
    async def change_status(memory_id: str, status: str) -> bool:
        return await repo.update_memory_status(memory_id, status)