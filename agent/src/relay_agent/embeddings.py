"""Local embedding implementation for Relay semantic retrieval."""

from collections.abc import Iterable
from typing import Protocol

from fastembed import TextEmbedding


class EmbeddingBackend(Protocol):
    """Minimal interface required from an embedding backend."""

    def embed(
        self,
        documents: list[str],
    ) -> Iterable[Iterable[float]]:
        """Generate vectors for the supplied documents."""
        ...


class MiniLMEmbedder:
    """Generate free local embeddings using all-MiniLM-L6-v2."""

    MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
    DIMENSIONS = 384

    def __init__(
        self,
        model: EmbeddingBackend | None = None,
    ) -> None:
        self._model = model or TextEmbedding(
            model_name=self.MODEL_NAME,
        )

    def embed(self, text: str) -> list[float]:
        """Generate one validated 384-dimensional embedding."""

        cleaned_text = text.strip()

        if not cleaned_text:
            raise ValueError("Embedding text must not be empty")

        generated_vectors = iter(
            self._model.embed([cleaned_text])
        )

        vector = next(generated_vectors, None)

        if vector is None:
            raise RuntimeError(
                "Embedding backend returned no vector"
            )

        values = [float(value) for value in vector]

        if len(values) != self.DIMENSIONS:
            raise ValueError(
                f"Expected {self.DIMENSIONS} dimensions, "
                f"received {len(values)}"
            )

        return values
