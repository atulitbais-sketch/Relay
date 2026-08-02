"""Deterministic fake dependencies used for tests and local development."""

from relay_agent.domain import ModelOutput


class FakeReasoningModel:
    """A deterministic replacement for Amazon Bedrock."""

    def __init__(self, answer: str = "Grounded answer generated.") -> None:
        self.answer = answer
        self.last_user_message: str | None = None
        self.last_grounding_context: str | None = None

    def generate(
        self,
        *,
        user_message: str,
        grounding_context: str,
    ) -> ModelOutput:
        self.last_user_message = user_message
        self.last_grounding_context = grounding_context

        return ModelOutput(answer=self.answer)
