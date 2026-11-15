"""Print the 14-day personalized baselines for every astronaut.

Run from the backend folder:  python -m app.jobs.compute_baselines
"""
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.astronaut import Astronaut
from app.services.baseline_service import compute_baseline, profile_status

SHOW = ["heart_rate", "bp_systolic", "spo2", "resp_rate", "sleep_total_h", "sleep_efficiency"]


def f(v, nd=2):
    return "-" if v is None else f"{v:.{nd}f}"


def main() -> None:
    with SessionLocal() as db:
        for a in db.execute(select(Astronaut).order_by(Astronaut.astronaut_id)).scalars():
            b = compute_baseline(db, a.astronaut_id)
            print(f"\n{a.astronaut_id} ({a.name}) -> {profile_status(b)}")
            print(f"{'variable':18}{'mean':>8}{'median':>8}{'SD':>7}{'MAD':>7}{'n':>6}{'cover%':>8}  status")
            for var in SHOW:
                s = b[var]
                print(f"{var:18}{f(s['mean']):>8}{f(s['median']):>8}{f(s['std']):>7}"
                      f"{f(s['mad']):>7}{s['n_used']:>6}{f(s['coverage_pct'], 0):>8}  {s['status']}")


if __name__ == "__main__":
    main()
