from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, String, DateTime, select
from datetime import datetime, timezone
from dotenv import load_dotenv
import os
import uuid

load_dotenv()

# DATABASE
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL tidak ditemukan di environment!")

ASYNC_DB_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

engine = create_async_engine(
    ASYNC_DB_URL,
    connect_args={"ssl": "require"},  # NEON WAJIB SSL
)

AsyncSessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()

# DATABASE MODEL
class ContactDB(Base):
    __tablename__ = "contacts"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=True)
    message = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

# PYDANTIC
class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str | None = None
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str | None
    message: str
    timestamp: datetime

    class Config:
        from_attributes = True

# FASTAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/api")

# CREATE TABLE OTOMATIS
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database connected & tables ready")

# ENDPOINT CONTACT
@router.post("/contact", response_model=ContactResponse)
async def create_message(item: ContactCreate):
    async with AsyncSessionLocal() as session:
        db_item = ContactDB(
            name=item.name,
            email=item.email,
            subject=item.subject,
            message=item.message
        )
        session.add(db_item)
        await session.commit()
        await session.refresh(db_item)
        return db_item

app.include_router(router)

# RUN LOCAL
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
