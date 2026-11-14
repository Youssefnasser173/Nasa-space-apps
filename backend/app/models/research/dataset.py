"""Provenance record for every data source loaded into ASTROGUARD."""
from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    source: Mapped[str] = mapped_column(String(300))
    is_simulated: Mapped[bool] = mapped_column(Boolean, default=True)
    loaded_at: Mapped[str] = mapped_column(String(40))
    notes: Mapped[str] = mapped_column(Text, default="")