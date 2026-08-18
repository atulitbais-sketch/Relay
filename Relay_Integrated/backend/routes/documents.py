from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from models.schemas import Document, DocumentCreate, PresignRequest, PresignResponse
from services.database import db
from services.document_parser import extract_text, format_size
from services.ingestion import process_document
from services.storage import storage

router = APIRouter(prefix="/api/documents", tags=["Documents"])

SUPPORTED_EXTENSIONS = {".txt", ".md", ".pdf", ".docx"}


def _build_document(project_id: str, name: str, raw: bytes, text: str, category: str = "General"):
    doc_id = storage.create_document_id()
    extension = Path(name).suffix.lower().lstrip(".") or "txt"
    return {
        "id": doc_id,
        "project_id": project_id,
        "name": name,
        "type": extension,
        "category": category or "General",
        "size": format_size(len(raw)),
        "status": "indexed",
        "content": text,
    }


@router.get("", response_model=list[Document])
def get_documents(project_id: str = "nexora"):
    return db.get_documents(project_id)


@router.post("/upload", response_model=Document)
async def upload_document(
    project_id: str = Form("nexora"),
    category: str = Form("General"),
    file: UploadFile = File(...),
):
    name = file.filename or "document.txt"
    extension = Path(name).suffix.lower()
    if extension not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=415,
            detail="Unsupported file type. Please upload TXT, MD, PDF or DOCX files.",
        )

    raw = await file.read()
    if not raw:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    try:
        text = extract_text(name, raw)
    except (ValueError, RuntimeError) as exc:
        raise HTTPException(status_code=415, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read the document: {exc}") from exc

    if not text.strip():
        raise HTTPException(status_code=422, detail="No readable text was found in the document.")

    document = _build_document(project_id, name, raw, text, category)
    db.add_document(document)
    process_document(project_id, document["id"], name, text)
    return document


@router.post("/new", response_model=Document)
def create_document(request: DocumentCreate):
    name = request.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="File name is required.")

    extension = Path(name).suffix.lower()
    if extension not in {".txt", ".md"}:
        raise HTTPException(status_code=415, detail="New files can currently be created as TXT or MD files.")

    content = request.content or ""
    raw = content.encode("utf-8")
    document = _build_document(request.project_id, name, raw, content, request.category)
    db.add_document(document)
    if content.strip():
        process_document(request.project_id, document["id"], name, content)
    return document


@router.delete("/{document_id}")
def delete_document(document_id: str, project_id: str = "nexora"):
    deleted = db.delete_document(project_id, document_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Document not found.")
    return {"success": True, "id": document_id}


@router.post("/presign", response_model=PresignResponse)
def create_presigned_upload(request: PresignRequest):
    document_id = storage.create_document_id()
    object_key = storage.create_object_key(request.project_id, document_id, request.filename)
    try:
        upload_url = storage.create_presigned_upload_url(object_key, request.content_type)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"document_id": document_id, "upload_url": upload_url, "object_key": object_key}
