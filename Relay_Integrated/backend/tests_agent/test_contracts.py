from uuid import uuid4

import pytest
from pydantic import ValidationError

from relay_agent.contracts import (
    ActionType,
    AgentRequest,
    AgentResponse,
    MemoryStatus,
    ProposedAction,
)


def test_valid_agent_request() -> None:
    request = AgentRequest(
        workspace_id=uuid4(),
        project_id=uuid4(),
        user_id=uuid4(),
        conversation_id=uuid4(),
        message="Why was Vendor Alpha rejected?",
    )

    assert request.message == "Why was Vendor Alpha rejected?"


def test_empty_message_is_rejected() -> None:
    with pytest.raises(ValidationError):
        AgentRequest(
            workspace_id=uuid4(),
            project_id=uuid4(),
            user_id=uuid4(),
            conversation_id=uuid4(),
            message="",
        )


def test_unknown_fields_are_rejected() -> None:
    with pytest.raises(ValidationError):
        AgentRequest(
            workspace_id=uuid4(),
            project_id=uuid4(),
            user_id=uuid4(),
            conversation_id=uuid4(),
            message="Show pending tasks.",
            unexpected_field="not allowed",
        )


def test_agent_response_with_proposed_action() -> None:
    response = AgentResponse(
        answer="One unresolved security task was found.",
        proposed_actions=[
            ProposedAction(
                action_type=ActionType.CREATE_TASK,
                payload={
                    "title": "Complete API security review",
                    "status": "pending",
                },
            )
        ],
    )

    assert response.proposed_actions[0].requires_confirmation is True
    assert response.proposed_actions[0].action_type == ActionType.CREATE_TASK


def test_memory_status_values() -> None:
    assert MemoryStatus.ACTIVE.value == "active"
    assert MemoryStatus.SUPERSEDED.value == "superseded"
