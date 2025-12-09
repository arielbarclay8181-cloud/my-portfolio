from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, String, DateTime, select, text

# Load environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    DATABASE_URL = "postgresql://neondb_owner:npg_FtTON3g6EHiy@ep-lucky-dew-a40oe7qr-pooler.us-east-1.aws.neon.tech/neondb"

print(f"🔗 Database URL: {DATABASE_URL[:60]}...")

# Convert to async URL
ASYNC_DB_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

print(f"🔗 Async URL: {ASYNC_DB_URL[:60]}...")

engine = create_async_engine(
    ASYNC_DB_URL, 
    echo=True,
    connect_args={
        "ssl": "require"  
    }
)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()


class StatusCheckDB(Base):
    __tablename__ = "status_checks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    client_name = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str

class StatusCheckResponse(BaseModel):
    id: str
    client_name: str
    timestamp: datetime
    
    class Config:
        from_attributes = True

class ContactMessageDB(Base):
    __tablename__ = "contacts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=True)
    message = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str = Field(default=None)
    message: str

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str | None
    message: str
    timestamp: datetime
    
    class Config:
        from_attributes = True

# Test database connection
async def test_connection():
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("✅ Database connection test: PASSED")
            return True
    except Exception as e:
        print(f"❌ Database connection test: FAILED - {e}")
        return False

# Create tables
async def create_tables():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Tables created successfully")
        return True
    except Exception as e:
        print(f"❌ Table creation failed: {e}")
        return False

# FastAPI App
app = FastAPI(
    title="Portfolio Backend",
    description="Powered by Neon PostgreSQL",
    version="1.0.0"
)

# Startup event
@app.on_event("startup")
async def startup_event():
    print("🚀 Starting Portfolio Backend...")
    
    # Test connection
    connected = await test_connection()
    if not connected:
        print("⚠️ Running without database connection")
        return
    
    # Create tables
    success = await create_tables()
    if success:
        print("✅ Backend ready at http://localhost:5000")
        print("📚 API Docs: http://localhost:5000/docs")
    else:
        print("⚠️ Backend running with database issues")
    print("✅ Backend ready! (DB connection skipped for Vercel debugging)")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router
api_router = APIRouter(prefix="/api")

@api_router.get("/", tags=["Health"])
async def root():
    return {
        "message": "🚀 Portfolio Backend is running!",
        "database": "Neon PostgreSQL",
        "status": "healthy",
        "docs": "http://localhost:5000/docs"
    }

@api_router.post("/status", response_model=StatusCheckResponse, tags=["Status"])
async def create_status_check(item: StatusCheckCreate):
    try:
        async with AsyncSessionLocal() as session:
            db_item = StatusCheckDB(
                id=str(uuid.uuid4()),
                client_name=item.client_name
            )
            session.add(db_item)
            await session.commit()
            await session.refresh(db_item)
            
            print(f"📝 Created status check: {db_item.client_name}")
            return StatusCheckResponse.from_orm(db_item)
    except Exception as e:
        print(f"❌ Error creating status: {e}")
        raise HTTPException(status_code=500, detail="Database error")

@api_router.get("/status", response_model=List[StatusCheckResponse], tags=["Status"])
async def get_status_checks():
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(StatusCheckDB))
            items = result.scalars().all()
            print(f"📊 Retrieved {len(items)} status checks")
            return [StatusCheckResponse.from_orm(item) for item in items]
    except Exception as e:
        print(f"❌ Error getting status: {e}")
        return []

@api_router.delete("/status/{item_id}", tags=["Status"])
async def delete_status_check(item_id: str):
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(StatusCheckDB).where(StatusCheckDB.id == item_id)
            )
            item = result.scalar_one_or_none()
            
            if not item:
                raise HTTPException(status_code=404, detail="Item not found")
            
            await session.delete(item)
            await session.commit()
            
            print(f"🗑️ Deleted status check: {item_id}")
            return {"message": "Item deleted", "id": item_id}
    except Exception as e:
        print(f"❌ Error deleting status: {e}")
        raise HTTPException(status_code=500, detail="Database error")
    
@api_router.post("/contact", response_model=ContactMessageResponse, tags=["Contact"])
async def receive_contact_message(item: ContactMessageCreate):
    try:
        async with AsyncSessionLocal() as session:
            db_item = ContactMessageDB(
                id=str(uuid.uuid4()),
                name=item.name,
                email=item.email,
                subject=item.subject,
                message=item.message
            )
            session.add(db_item)
            await session.commit()
            await session.refresh(db_item)
            
            print(f"📧 New contact message received from: {db_item.email}")
            return ContactMessageResponse.from_orm(db_item)
    except Exception as e:
        print(f"❌ Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Database error or missing fields")

# Include router
app.include_router(api_router)

# Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")