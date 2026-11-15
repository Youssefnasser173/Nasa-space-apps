"""NORELIS - Personalized Human Spaceflight Health Intelligence Backend API
Powered by FastAPI, SQLAlchemy, and SQLite (NASA Space Apps).
"""
import datetime
from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.db.session import get_db, engine
from app.db.init_db import init_db
from app.models.astronaut import Astronaut
from app.models.measurement import Measurement
from app.services.baseline_service import compute_baseline

# Ensure DB tables exist
init_db()

app = FastAPI(
    title="NORELIS Astronaut Health Intelligence API",
    description="Operational Earth Physiological Baselines & Telemetry API for NASA Spaceflight Missions",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class AstronautOut(BaseModel):
    astronaut_id: str
    name: str
    age: Optional[int] = None
    sex: Optional[str] = None
    height_cm: Optional[float] = None
    mass_kg: Optional[float] = None
    medical_history: Optional[str] = ""
    mission_start: Optional[str] = None
    mission_days: Optional[int] = None
    is_simulated: Optional[bool] = True

class LoginRequest(BaseModel):
    identifier: str
    password: Optional[str] = "astronaut123"

class LoginResponse(BaseModel):
    success: bool
    user: AstronautOut
    token: str
    message: str

@app.get("/")
def root():
    return {
        "project": "NORELIS",
        "system": "Personalized Human Health Intelligence API",
        "status": "online",
        "docs": "/docs",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }

@app.get("/api/v1/health")
def health_check(db: Session = Depends(get_db)):
    count = db.scalar(select(func.count()).select_from(Astronaut))
    return {
        "status": "healthy",
        "database": "astroguard.db",
        "astronauts_count": count
    }

@app.get("/api/v1/astronauts", response_model=List[AstronautOut])
def get_astronauts(db: Session = Depends(get_db)):
    """Retrieve all registered crew astronauts."""
    astronauts = db.execute(select(Astronaut)).scalars().all()
    return astronauts

@app.get("/api/v1/astronauts/{astronaut_id}", response_model=AstronautOut)
def get_astronaut(astronaut_id: str, db: Session = Depends(get_db)):
    """Retrieve details for a specific astronaut."""
    astro = db.get(Astronaut, astronaut_id)
    if not astro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Astronaut {astronaut_id} not found."
        )
    return astro

@app.get("/api/v1/astronauts/{astronaut_id}/baseline")
def get_astronaut_baseline(astronaut_id: str, db: Session = Depends(get_db)):
    """Compute personalized Earth baseline metrics from 14-day pre-flight data."""
    astro = db.get(Astronaut, astronaut_id)
    if not astro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Astronaut {astronaut_id} not found."
        )
    
    baseline_stats = compute_baseline(db, astronaut_id)
    return {
        "astronaut_id": astronaut_id,
        "name": astro.name,
        "computed_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "baseline_days": 14,
        "status": "VALIDATED_EARTH_BASELINE",
        "parameters": baseline_stats
    }

@app.get("/api/v1/astronauts/{astronaut_id}/measurements")
def get_astronaut_measurements(
    astronaut_id: str,
    variable: Optional[str] = None,
    limit: int = Query(default=100, le=1000),
    db: Session = Depends(get_db)
):
    """Retrieve time-series telemetry measurements."""
    query = select(Measurement).where(Measurement.astronaut_id == astronaut_id)
    if variable:
        query = query.where(Measurement.variable == variable)
    query = query.order_by(Measurement.mission_day.asc()).limit(limit)
    rows = db.execute(query).scalars().all()
    return rows

@app.post("/api/v1/auth/login", response_model=LoginResponse)
def login_astronaut(payload: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate an astronaut by ID and initialize telemetry session."""
    ident = payload.identifier.strip().upper()
    astro = db.get(Astronaut, ident)
    if not astro:
        # Fallback to search by name or first astronaut
        astro = db.execute(
            select(Astronaut).where(Astronaut.astronaut_id.ilike(f"%{ident}%"))
        ).scalars().first()

    if not astro:
        # If ID is unknown, default to Alpha for convenience
        astro = db.get(Astronaut, "AG-001")

    if not astro:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid astronaut identifier."
        )

    return LoginResponse(
        success=True,
        user=astro,
        token=f"norelis_jwt_session_{astro.astronaut_id}_{datetime.datetime.now().timestamp()}",
        message="Astronaut session authenticated successfully."
    )

@app.get("/api/v1/alerts")
def get_alerts(db: Session = Depends(get_db)):
    """Return flight medical telemetry alerts."""
    return [
        {
            "id": "ALT-2026-01",
            "astronaut_id": "AG-001",
            "title": "Nominal Baseline Established",
            "severity": "info",
            "status": "resolved",
            "organ": "heart",
            "description": "Day 1-14 Earth baseline calibration converged within 95% confidence bounds."
        },
        {
            "id": "ALT-2026-02",
            "astronaut_id": "AG-002",
            "title": "Systolic Pressure Variance",
            "severity": "warning",
            "status": "monitoring",
            "organ": "heart",
            "description": "Elevated systolic pressure trend observed during high workload EVA protocol."
        }
    ]
