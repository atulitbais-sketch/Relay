from collections.abc import Iterable

import pytest

from relay_agent.embeddings import MiniLMEmbedder
from relay_agent.ports import Embedder


class FakeEmbeddingBackend:
    def __init__(self, vector: list[float]) -> None:
        self.vector = vector
        self.received_documents: list[str] | None = None

    def embed(
        self,
        documents: list[str],
    ) -> Iterable[Iterable[float]]:
        self.received_documents = documents
        return iter([self.vector])


def test_minilm_embedder_matches_protocol() -> None:
    backend = FakeEmbeddingBackend([0.1] * 384)
    embedder = MiniLMEmbedder(model=backend)

    assert isinstance(embedder, Embedder)


def test_embedder_returns_384_float_values() -> None:
    backend = FakeEmbeddingBackend([0.25] * 384)
    embedder = MiniLMEmbedder(model=backend)

    result = embedder.embed(
        "Why was Vendor Alpha rejected?"
    )

    assert len(result) == 384
    assert all(isinstance(value, float) for value in result)
    assert backend.received_documents == [
        "Why was Vendor Alpha rejected?"
    ]


def test_embedder_rejects_empty_text() -> None:
    backend = FakeEmbeddingBackend([0.1] * 384)
    embedder = MiniLMEmbedder(model=backend)

    with pytest.raises(
        ValueError,
        match="must not be empty",
    ):
        embedder.embed("   ")


def test_embedder_rejects_wrong_dimension() -> None:
    backend = FakeEmbeddingBackend([0.1] * 10)
    embedder = MiniLMEmbedder(model=backend)

    with pytest.raises(
        ValueError,
        match="Expected 384 dimensions",
    ):
        embedder.embed("Valid text")
