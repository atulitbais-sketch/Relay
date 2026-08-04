from typing import List
from fastembed import TextEmbedding


class EmbeddingService:
    _instance = None

    def __new__(cls):
        # Singleton so the model loads into memory only once
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
        return cls._instance

    def embed(self, text: str) -> List[float]:
        vectors = list(self.model.embed([text]))
        return vectors[0].tolist()