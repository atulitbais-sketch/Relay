from fastapi import APIRouter, HTTPException
from models.schemas import ActionConfirmationRequest, ActionConfirmationResponse
from services.database import db

router=APIRouter(prefix="/api/actions",tags=["Actions"])

@router.post("/{action_id}/confirm",response_model=ActionConfirmationResponse)
def confirm_action(action_id: str,request: ActionConfirmationRequest):
    if request.action_type.upper()!="CREATE_TASK":
        raise HTTPException(status_code=400,detail="Unsupported action type")
    task=db.create_task(request.project_id,request.title,
                        "Created by Relay agent after user confirmation.",request.priority)
    return {"success":True,"message":"Task created successfully.",
            "data":{"action_id":action_id,"task":task}}
