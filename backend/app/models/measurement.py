"""One physiological observation (long format: one row per value)."""
from sqlalchemy import Boolean, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id: Mapped[int] = mapped_column(primary_key=True)
    astronaut_id: Mapped[str] = mapped_column(
        ForeignKey("astronauts.astronaut_id"), index=True)
    timestamp: Mapped[str] = mapped_column(String(25), index=True)
    phase: Mapped[str] = mapped_column(String(20))
    mission_day: Mapped[int] = mapped_column(Integer, index=True)
    variable: Mapped[str] = mapped_column(String(50), index=True)
    value: Mapped[float] = mapped_column(Float)
    unit: Mapped[str] = mapped_column(String(40))
    source: Mapped[str] = mapped_column(String(200))
    quality: Mapped[str] = mapped_column(String(10))
    is_simulated: Mapped[bool] = mapped_column(Boolean, default=True)
    dataset_id: Mapped[int] = mapped_column(ForeignKey("datasets.id"), nullable=True)