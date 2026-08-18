from __future__ import annotations
from typing import Any
from uuid import uuid4
import re

class DatabaseService:
    """Single application data store used by the API and integrated agent.

    It is intentionally in-memory for local development. Replace this class with
    a CockroachDB repository when production persistence is enabled.
    """
    def __init__(self):
        self.tasks: list[dict[str, Any]] = [
            {"id":"task-001","project_id":"nexora","title":"Complete security review",
             "description":"Review the deployment security controls.","status":"pending","priority":"high"}
        ]
        self.conflicts: list[dict[str, Any]] = []
        self.documents: list[dict[str, Any]] = [
            {"id":"doc-vendor-alpha","project_id":"nexora","name":"vendor-alpha.txt",
             "type":"txt","category":"Engineering","size":"1 KB","status":"indexed",
             "content":"Vendor Alpha was rejected because its security controls did not meet the required enterprise security baseline."},
            {"id":"doc-architecture-v1","project_id":"nexora","name":"architecture-v1.txt",
             "type":"txt","category":"Engineering","size":"1 KB","status":"indexed",
             "content":"The Nexora production platform must use Deployment Pattern Alpha."},
        ]
        self.memories: list[dict[str, Any]] = [
            {"id":"memory-001","project_id":"nexora","document_id":"doc-vendor-alpha",
             "document_name":"vendor-alpha.txt","content":self.documents[0]["content"],
             "status":"active","memory_type":"claim"},
            {"id":"memory-002","project_id":"nexora","document_id":"doc-architecture-v1",
             "document_name":"architecture-v1.txt","content":self.documents[1]["content"],
             "status":"active","memory_type":"decision"},
        ]
        self.chat_count = 0

    def search_memory(self, project_id: str, query: str, limit: int = 5):
        words = set(re.findall(r"\w+", query.lower()))
        scored=[]
        for m in self.memories:
            if m["project_id"] != project_id or m.get("status") != "active":
                continue
            mw=set(re.findall(r"\w+", m["content"].lower()))
            score=len(words & mw)
            scored.append((score,m))
        scored.sort(key=lambda x:x[0], reverse=True)
        return [m for _,m in scored[:limit]]

    def get_tasks(self, project_id: str):
        return [t for t in self.tasks if t["project_id"] == project_id]

    def create_task(self, project_id, title, description="", priority="medium"):
        task={"id":str(uuid4()),"project_id":project_id,"title":title,
              "description":description,"status":"pending","priority":priority}
        self.tasks.append(task); return task

    def update_task(self, task_id, data):
        for t in self.tasks:
            if t["id"] == task_id:
                t.update({k:v for k,v in data.items() if v is not None})
                return t
        return None

    def get_conflicts(self, project_id):
        return [c for c in self.conflicts if c["project_id"] == project_id]

    def create_conflict(self, project_id, description, old_memory_id=None, new_memory_id=None):
        c={"id":str(uuid4()),"project_id":project_id,"old_memory_id":old_memory_id,
           "new_memory_id":new_memory_id,"description":description,"status":"unresolved"}
        self.conflicts.append(c); return c

    def resolve_conflict(self, conflict_id, resolution):
        for c in self.conflicts:
            if c["id"] == conflict_id:
                c["status"]="resolved"; c["resolution"]=resolution; return c
        return None

    def add_memory(self, memory):
        self.memories.append(memory); return memory

    def add_document(self, document):
        self.documents.append(document); return document

    def get_documents(self, project_id):
        return [d for d in self.documents if d["project_id"] == project_id]

    def delete_document(self, project_id, document_id):
        for index, document in enumerate(self.documents):
            if document["project_id"] == project_id and document["id"] == document_id:
                self.documents.pop(index)
                self.memories[:] = [m for m in self.memories if m.get("document_id") != document_id]
                return document
        return None

db=DatabaseService()
