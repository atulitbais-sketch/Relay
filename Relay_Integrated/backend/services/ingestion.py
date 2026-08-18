from uuid import uuid4
from services.database import db

def process_document(project_id,document_id,filename,text):
    lower=text.lower()
    memory_type="claim"
    if "decision" in lower: memory_type="decision"
    elif "task" in lower: memory_type="task"
    return db.add_memory({"id":f"memory-{uuid4()}","project_id":project_id,
        "document_id":document_id,"document_name":filename,"content":text,
        "status":"active","memory_type":memory_type})
