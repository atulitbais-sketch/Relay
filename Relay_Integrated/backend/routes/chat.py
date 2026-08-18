from fastapi import APIRouter, HTTPException
from models.schemas import ChatRequest, ChatResponse
from services.agent_integration import chat

router=APIRouter(prefix="/api/chat",tags=["Chat"])

@router.post("/message",response_model=ChatResponse)
def send_message(request: ChatRequest):
    try:
        return chat(request.project_id,request.message,request.user_id,request.conversation_id)
    except Exception as exc:
        raise HTTPException(status_code=500,detail=f"Agent error: {exc}") from exc

@router.get("/conversations")
def conversations():
    return []
