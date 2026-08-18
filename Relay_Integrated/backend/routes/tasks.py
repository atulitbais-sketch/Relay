from fastapi import APIRouter, HTTPException
from models.schemas import Task, TaskCreate, TaskUpdate
from services.database import db

router=APIRouter(prefix="/api/tasks",tags=["Tasks"])

@router.get("",response_model=list[Task])
def get_tasks(project_id: str="nexora"):
    return db.get_tasks(project_id)

@router.post("",response_model=Task)
def create_task(request: TaskCreate):
    return db.create_task(request.project_id,request.title,request.description,request.priority)

@router.patch("/{task_id}",response_model=Task)
def update_task(task_id: str,request: TaskUpdate):
    result=db.update_task(task_id,request.model_dump(exclude_none=True))
    if not result: raise HTTPException(status_code=404,detail="Task not found")
    return result
