from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
import os
import sys # Digunakan untuk menghentikan program jika terjadi error fatal
import uuid
from datetime import datetime, timezone
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List

# Import yang dibutuhkan untuk SQLAlchemy
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, String, DateTime, select, text

# 🚨 CATATAN PENTING:
# 1. Hapus load_dotenv() karena Vercel menggunakan Environment Variables (EV) langsung.
# 2. Hapus hardcoded key database. EV harus diatur di dashboard Vercel.

# ----------------------------------------------------------------------
# 🔑 1. Pengambilan dan Validasi Environment Variable
# ----------------------------------------------------------------------

# Ambil DATABASE_URL dari Environment Variables Vercel
DATABASE_URL = os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    # Jika variabel tidak ditemukan, cetak pesan error fatal dan hentikan program
    # Ini akan mencegah deployment berjalan dengan database yang salah/kosong
    print("❌ FATAL ERROR: DATABASE_URL environment variable is missing!")
    print("    Pastikan Anda telah mengatur 'DATABASE_URL' di Vercel Dashboard.")
    sys.exit(1) # Hentikan proses

print(f"🔗 Database URL diambil. Panjang: {len(DATABASE_URL)} karakter.")

# ----------------------------------------------------------------------
# ⚙️ 2. Konfigurasi Database (SQLAlchemy)
# ----------------------------------------------------------------------

# Convert ke URL async yang dibutuhkan oleh asyncpg
ASYNC_DB_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

# SQLAlchemy setup dengan SSL untuk Neon
engine = create_async_engine(
    ASYNC_DB_URL, 
    echo=False, # Ubah ke True jika Anda ingin melihat semua query SQL
    connect_args={
        "ssl": "require"  # Ini penting untuk Neon!
    }
)

AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

# ----------------------------------------------------------------------
# 🧱 3. Database & Pydantic Models (Tidak diubah dari kode Anda)
# ----------------------------------------------------------------------

# Database Model - Status Check
class StatusCheckDB(Base):
    __tablename__ = "status_checks"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    client_name = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

# Pydantic Model - Status Check
class StatusCheckCreate(BaseModel):
    client_name: str

class StatusCheckResponse(BaseModel):
    id: str
    client_name: str
    timestamp: datetime
    class Config:
        from_attributes = True

# Database Model - Contact Message
class ContactMessageDB(Base):
    __tablename__ = "contacts"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=True)
    message = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

# Pydantic Model - Contact Message
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

# ----------------------------------------------------------------------
# 🛠️ 4. Fungsi Database Helper
# ----------------------------------------------------------------------

async def test_connection():
    try:
        async with engine.connect() as conn:
            # Gunakan query yang sangat ringan
            await conn.execute(text("SELECT 1"))
            print("✅ Database connection test: PASSED")
            return True
    except Exception as e:
        print(f"❌ Database connection test: FAILED - {e}")
        return False

async def create_tables():
    try:
        async with engine.begin() as conn:
            # Buat tabel jika belum ada (idempotent)
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Tables created successfully")
        return True
    except Exception as e:
        print(f"❌ Table creation failed: {e}")
        return False

# ----------------------------------------------------------------------
# 🚀 5. Konfigurasi FastAPI dan Event
# ----------------------------------------------------------------------

app = FastAPI(
    title="Portfolio Backend",
    description="Powered by Neon PostgreSQL",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Ganti dengan domain frontend Anda saat deploy
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    print("🚀 Starting Portfolio Backend...")
    
    # Koneksi dan Buat Tabel saat startup
    connected = await test_connection()
    if not connected:
        print("⚠️ Running without database connection (endpoints akan gagal)")
        return
    
    success = await create_tables()
    if success:
        print("✅ Backend ready")
    else:
        print("⚠️ Backend running with database issues")

# ----------------------------------------------------------------------
# 🌐 6. Definisi Endpoint (Routes)
# ----------------------------------------------------------------------

api_router = APIRouter(prefix="/api")

@api_router.get("/", tags=["Health"])
async def root():
    return {
        "message": "🚀 Portfolio Backend is running!",
        "database": "Neon PostgreSQL",
        "status": "healthy"
    }

# Endpoint Status Check dan Contact (sesuai kode Anda)
# ... [Semua endpoint yang Anda definisikan sebelumnya tetap sama] ...

@api_router.post("/status", response_model=StatusCheckResponse, tags=["Status"])
# (Kode fungsi create_status_check...)
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
            return StatusCheckResponse.from_orm(db_item)
    except Exception as e:
        print(f"❌ Error creating status: {e}")
        raise HTTPException(status_code=500, detail="Database error")

@api_router.get("/status", response_model=List[StatusCheckResponse], tags=["Status"])
# (Kode fungsi get_status_checks...)
async def get_status_checks():
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(StatusCheckDB))
            items = result.scalars().all()
            return [StatusCheckResponse.from_orm(item) for item in items]
    except Exception as e:
        print(f"❌ Error getting status: {e}")
        return []

@api_router.delete("/status/{item_id}", tags=["Status"])
# (Kode fungsi delete_status_check...)
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
            return {"message": "Item deleted", "id": item_id}
    except Exception as e:
        print(f"❌ Error deleting status: {e}")
        raise HTTPException(status_code=500, detail="Database error")
    
@api_router.post("/contact", response_model=ContactMessageResponse, tags=["Contact"])
# (Kode fungsi receive_contact_message...)
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
            return ContactMessageResponse.from_orm(db_item)
    except Exception as e:
        print(f"❌ Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Database error or missing fields")


# Include router
app.include_router(api_router)

# ----------------------------------------------------------------------
# 🖥️ 7. Main block (Hanya untuk menjalankan secara lokal)
# ----------------------------------------------------------------------

if __name__ == "__main__":
    # Load environment HANYA jika dijalankan secara lokal (untuk uvicorn)
    from dotenv import load_dotenv
    ROOT_DIR = Path(__file__).parent
    load_dotenv(ROOT_DIR / '.env')
    
    # Jalankan Uvicorn
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")