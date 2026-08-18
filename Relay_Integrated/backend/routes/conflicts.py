from fastapi import APIRouter, HTTPException
from models.schemas import Conflict, ConflictResolve
from services.database import db

router=APIRouter(prefix="/api/conflicts",tags=["Conflicts"])

@router.get("",response_model=list[Conflict])
def get_conflicts(project_id: str="nexora"):
    return db.get_conflicts(project_id)

@router.post("/{conflict_id}/resolve")
def resolve_conflict(conflict_id: str,request: ConflictResolve):
    result=db.resolve_conflict(conflict_id,request.resolution)
    if not result: raise HTTPException(status_code=404,detail="Conflict not found")
    return result

@router.post("/{conflict_id}/dismiss")
def dismiss_conflict(conflict_id: str):
    result=db.resolve_conflict(conflict_id,"Dismissed")
    if not result: raise HTTPException(status_code=404,detail="Conflict not found")
    result["status"]="dismissed"
    return result
