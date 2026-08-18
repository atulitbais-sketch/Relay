import os
from uuid import uuid4

class StorageService:
    def __init__(self):
        self.region=os.getenv("AWS_REGION","ap-south-1")
        self.bucket=os.getenv("S3_BUCKET_NAME")
        self._s3=None

    @property
    def s3(self):
        if self._s3 is None:
            import boto3
            self._s3=boto3.client("s3",region_name=self.region)
        return self._s3

    def create_document_id(self): return f"doc-{uuid4()}"
    def create_object_key(self,project_id,document_id,filename):
        return f"documents/{project_id}/{document_id}/{filename}"

    def create_presigned_upload_url(self,object_key,content_type,expires_in=900):
        if not self.bucket: raise RuntimeError("S3_BUCKET_NAME is not configured.")
        return self.s3.generate_presigned_url("put_object",
            Params={"Bucket":self.bucket,"Key":object_key,"ContentType":content_type},
            ExpiresIn=expires_in)

storage=StorageService()
