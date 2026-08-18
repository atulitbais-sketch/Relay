from fastapi import APIRouter
from services.database import db

router=APIRouter(prefix="/api/dashboard",tags=["Dashboard"])

@router.get("/stats")
def stats(project_id: str="nexora"):
    docs=len(db.get_documents(project_id))
    active=sum(1 for t in db.get_tasks(project_id) if t["status"]!="completed")
    conflicts=len([c for c in db.get_conflicts(project_id) if c["status"]=="unresolved"])
    return {"documentsIndexed":{"value":docs,"change":0,"changeLabel":"current"},
            "activeTasks":{"value":active,"change":0,"changeLabel":"current"},
            "memoryConflicts":{"value":conflicts,"change":0,"changeLabel":"current"},
            "insightsGenerated":{"value":db.chat_count,"change":0,"changeLabel":"this session"}}

@router.get("/activity")
def activity():
    return [{"day":d,"queries":0,"documents":0,"insights":0} for d in ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]]
