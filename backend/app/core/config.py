"""Project paths and settings."""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[3]   # repo root
DATA_DIR = ROOT / "data"
SYNTHETIC_DIR = DATA_DIR / "synthetic"
DB_PATH = DATA_DIR / "processed" / "astroguard.db"
DATABASE_URL = f"sqlite:///{DB_PATH}"