"""Load the synthetic CSVs into SQLite. Safe to re-run (resets the DB).

Run from the backend folder:  python -m app.jobs.load_synthetic
"""
import datetime

import pandas as pd
from sqlalchemy import func, select

from app.core.config import DB_PATH, SYNTHETIC_DIR
from app.db.init_db import reset_db
from app.db.session import SessionLocal
from app.models.astronaut import Astronaut
from app.models.measurement import Measurement
from app.models.research.dataset import Dataset


def _to_bool(series: pd.Series) -> pd.Series:
    return series.astype(str).str.lower() == "true"


def main() -> None:
    astro_csv = SYNTHETIC_DIR / "astronauts.csv"
    meas_csv = SYNTHETIC_DIR / "measurements.csv"
    for f in (astro_csv, meas_csv):
        if not f.exists():
            raise SystemExit(f"Missing file: {f}")

    astro = pd.read_csv(astro_csv)
    meas = pd.read_csv(meas_csv)
    astro["is_simulated"] = _to_bool(astro["is_simulated"])
    meas["is_simulated"] = _to_bool(meas["is_simulated"])

    reset_db()
    with SessionLocal() as db:
        ds = Dataset(
            name="ASTROGUARD synthetic demo data",
            source="backend/scripts/generate_synthetic.py (seed 20261114)",
            is_simulated=True,
            loaded_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),
            notes="SIMULATED DATA - NOT REAL ASTRONAUT MEASUREMENTS",
        )
        db.add(ds)
        db.flush()

        db.add_all(
            Astronaut(**{k: (None if pd.isna(v) else v) for k, v in row.items()})
            for row in astro.to_dict("records")
        )
        db.flush()

        meas["dataset_id"] = ds.id
        db.bulk_insert_mappings(Measurement, meas.to_dict("records"))
        db.commit()

        print("astronauts  :", db.scalar(select(func.count()).select_from(Astronaut)))
        print("measurements:", db.scalar(select(func.count()).select_from(Measurement)))
        for aid, n in db.execute(
            select(Measurement.astronaut_id, func.count()).group_by(Measurement.astronaut_id)
        ):
            print(f"  {aid}: {n}")
        print("DB file:", DB_PATH)


if __name__ == "__main__":
    main()