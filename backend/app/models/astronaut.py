"""Astronaut profile."""
from sqlalchemy import Boolean, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Astronaut(Base):
    __tablename__ = "astronauts"

    astronaut_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    age: Mapped[int] = mapped_column(Integer, nullable=True)
    sex: Mapped[str] = mapped_column(String(10), nullable=True)
    height_cm: Mapped[float] = mapped_column(Float, nullable=True)
    mass_kg: Mapped[float] = mapped_column(Float, nullable=True)
    medical_history: Mapped[str] = mapped_column(Text, default="")
    mission_start: Mapped[str] = mapped_column(String(20), nullable=True)
    mission_days: Mapped[int] = mapped_column(Integer, nullable=True)
    is_simulated: Mapped[bool] = mapped_column(Boolean, default=True)