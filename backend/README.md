# FastAPI Backend - Neon + Railway

## 🚀 Cara Run Lokal
1. buat `.env`
2. isi:
   DATABASE_URL=postgresql://xxx...

3. install:
   pip install -r requirements.txt

4. run:
   uvicorn api:app --reload --port 5000

## 📡 Deploy ke Railway
- Import repo GitHub
- Tambah variable:
    DATABASE_URL = <link Neon>
- Deploy
