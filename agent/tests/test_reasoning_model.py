import pytest
from pydantic import ValidationError

from relay_agent.domain import ModelOutput
from relay_agent.fakes import FakeReasoningModel
from relay_agent.ports import ReasoningModel


def test_fake_model_matches_reasoning_protocol() -> None:
    assert isinstance(FakeReasoningModel(), ReasoningModel)


def test_fake_model_records_received_input() -> None:
    model = FakeReasoningModel(answer="Vendor Alpha failed compliance.")

    output = model.generate(
        user_message="Why was Vendor Alpha rejected?",
        grounding_context="Relevant enterprise evidence.",
    )

    assert output.answer == "Vendor Alpha failed compliance."
    assert model.last_user_message == "Why was Vendor Alpha rejected?"
    assert model.last_grounding_context == "Relevant enterprise evidence."


def test_model_output_requires_non_empty_answer() -> None:
    with pytest.raises(ValidationError):
        ModelOutput(answer="")
