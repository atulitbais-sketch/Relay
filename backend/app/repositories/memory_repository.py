import uuid
from typing import Optional, List, Dict, Any

from app.db.connection import get_pool

VECTOR_DIM = 384


def _vector_literal(embedding: List[float]) -> str:
    """Convert a python float list into a CockroachDB VECTOR literal string."""
    return "[" + ",".join(repr(float(x)) for x in embedding) + "]"


def _validate_embedding(embedding: List[float]) -> None:
    if embedding is None or len(embedding) != VECTOR_DIM:
        raise ValueError(
            f"Embedding must have exactly {VECTOR_DIM} dimensions, "
            f"got {len(embedding) if embedding is not None else 'None'}"
        )


async def save_memory(
    workspace_id: str,
    content: str,
    memory_type: str,
    embedding: List[float],
    document_source: Optional[str] = None,
    chunk_id: Optional[int] = None,
    importance: float = 0.5,
    status: str = "active",
) -> str:
    _validate_embedding(embedding)

    pool = await get_pool()
    memory_id = str(uuid.uuid4())
    vector_str = _vector_literal(embedding)

    query = """
        INSERT INTO memories (
            memory_id, workspace_id, content, memory_type,
            embedding, document_source, chunk_id, importance, status
        ) VALUES (
            $1, $2, $3, $4, $5::VECTOR(384), $6, $7, $8, $9
        )
        RETURNING memory_id
    """

    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            query,
            memory_id,
            workspace_id,
            content,
            memory_type,
            vector_str,
            document_source,
            chunk_id,
            importance,
            status,
        )

    return str(row["memory_id"])


async def semantic_search(
    workspace_id: str,
    query_embedding: List[float],
    limit: int = 5,
    memory_type: Optional[str] = None,
    status: str = "active",
) -> List[Dict[str, Any]]:
    _validate_embedding(query_embedding)

    pool = await get_pool()
    vector_str = _vector_literal(query_embedding)

    # <-> is L2 distance (pgvector-compatible operator CockroachDB supports).
    # Lower distance = more similar.
    if memory_type:
        query = """
            SELECT
                memory_id, workspace_id, content, memory_type,
                document_source, chunk_id, importance, status,
                embedding <-> $1::VECTOR(384) AS distance
            FROM memories
            WHERE workspace_id = $2 AND status = $3 AND memory_type = $4
            ORDER BY distance ASC
            LIMIT $5
        """
        params = [vector_str, workspace_id, status, memory_type, limit]
    else:
        query = """
            SELECT
                memory_id, workspace_id, content, memory_type,
                document_source, chunk_id, importance, status,
                embedding <-> $1::VECTOR(384) AS distance
            FROM memories
            WHERE workspace_id = $2 AND status = $3
            ORDER BY distance ASC
            LIMIT $4
        """
        params = [vector_str, workspace_id, status, limit]

    async with pool.acquire() as conn:
        rows = await conn.fetch(query, *params)

    return [dict(r) for r in rows]


async def get_active_memories(
    workspace_id: str,
    limit: int = 100,
    offset: int = 0,
) -> List[Dict[str, Any]]:
    pool = await get_pool()

    query = """
        SELECT
            memory_id, workspace_id, content, memory_type,
            document_source, chunk_id, importance, status
        FROM memories
        WHERE workspace_id = $1 AND status = 'active'
        ORDER BY importance DESC
        LIMIT $2 OFFSET $3
    """

    async with pool.acquire() as conn:
        rows = await conn.fetch(query, workspace_id, limit, offset)

    return [dict(r) for r in rows]


async def update_memory_status(memory_id: str, status: str) -> bool:
    valid_statuses = {"active", "archived", "deleted", "superseded"}
    if status not in valid_statuses:
        raise ValueError(f"Invalid status '{status}'. Must be one of {valid_statuses}")

    pool = await get_pool()

    query = """
        UPDATE memories
        SET status = $1
        WHERE memory_id = $2
        RETURNING memory_id
    """

    async with pool.acquire() as conn:
        row = await conn.fetchrow(query, status, memory_id)

    return row is not None