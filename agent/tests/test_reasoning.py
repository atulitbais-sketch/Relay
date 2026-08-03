from typing import Any

import pytest

from relay_agent.ports import ReasoningModel
from relay_agent.reasoning import LlamaCppReasoningModel


class FakeTransport:
    def __init__(
        self,
        response: dict[str, Any],
    ) -> None:
        self.response = response
        self.received_url: str | None = None
        self.received_payload: dict[str, Any] | None = None
        self.received_timeout: float | None = None

    def post_json(
        self,
        *,
        url: str,
        payload: dict[str, Any],
        timeout: float,
    ) -> dict[str, Any]:
        self.received_url = url
        self.received_payload = payload
        self.received_timeout = timeout
        return self.response


def make_server_response(content: str) -> dict[str, Any]:
    return {
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": content,
                }
            }
        ]
    }


def test_adapter_matches_reasoning_protocol() -> None:
    transport = FakeTransport(
        make_server_response(
            '{"answer":"Grounded answer.","proposed_actions":[]}'
        )
    )

    model = LlamaCppReasoningModel(
        transport=transport,
    )

    assert isinstance(model, ReasoningModel)


def test_adapter_returns_valid_model_output() -> None:
    transport = FakeTransport(
        make_server_response(
            '{"answer":"Vendor Alpha failed compliance.",'
            '"proposed_actions":[]}'
        )
    )

    model = LlamaCppReasoningModel(
        transport=transport,
        timeout_seconds=30,
    )

    result = model.generate(
        user_message="Why was Vendor Alpha rejected?",
        grounding_context="Vendor Alpha failed compliance.",
    )

    assert result.answer == "Vendor Alpha failed compliance."
    assert result.proposed_actions == []

    assert transport.received_url == (
        "http://127.0.0.1:8080/v1/chat/completions"
    )
    assert transport.received_timeout == 30
    assert transport.received_payload is not None


def test_adapter_accepts_json_code_fence() -> None:
    transport = FakeTransport(
        make_server_response(
            '```json\n'
            '{"answer":"Grounded answer.","proposed_actions":[]}'
            '\n```'
        )
    )

    model = LlamaCppReasoningModel(
        transport=transport,
    )

    result = model.generate(
        user_message="Question",
        grounding_context="Evidence",
    )

    assert result.answer == "Grounded answer."


def test_adapter_rejects_malformed_server_response() -> None:
    model = LlamaCppReasoningModel(
        transport=FakeTransport({"choices": []}),
    )

    with pytest.raises(
        RuntimeError,
        match="missing assistant content",
    ):
        model.generate(
            user_message="Question",
            grounding_context="Evidence",
        )


def test_adapter_rejects_invalid_model_json() -> None:
    model = LlamaCppReasoningModel(
        transport=FakeTransport(
            make_server_response("This is not JSON")
        ),
    )

    with pytest.raises(
        RuntimeError,
        match="valid structured JSON",
    ):
        model.generate(
            user_message="Question",
            grounding_context="Evidence",
        )


def test_adapter_rejects_invalid_timeout() -> None:
    with pytest.raises(
        ValueError,
        match="timeout_seconds",
    ):
        LlamaCppReasoningModel(
            timeout_seconds=0,
        )
