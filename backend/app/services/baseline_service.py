"""Personalized baseline learning (days 1-14 of the mission).

Baselines are computed separately for every astronaut and every variable.
Data from different astronauts is never mixed.
"""
from collections import defaultdict

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.measurement import Measurement
from app.services import stats

LEARNING_DAYS = 14

# Demonstration-only readiness criteria (NOT clinical standards).
MIN_COVERAGE_PCT = 70.0
MIN_DAYS_WITH_DATA = 10

# Expected observations per day in the synthetic data stream.
EXPECTED_PER_DAY = {
    "heart_rate": 6, "spo2": 6, "resp_rate": 6, "skin_temp": 6, "eda": 6,
    "bp_systolic": 2, "bp_diastolic": 2,
    "sleep_total_h": 1, "sleep_efficiency": 1, "hydration_index": 1,
    "radiation_absorbed_dose": 1,
}
# Variables strongly affected by exercise: baseline uses resting observations only.
EXERCISE_SENSITIVE = {"heart_rate", "bp_systolic", "bp_diastolic", "resp_rate", "spo2"}

NOT_READY = "INSUFFICIENT DATA - CONTINUE LEARNING"
READY = "READY FOR MONITORING"


def _learning_rows(db: Session, astronaut_id: str):
    return db.execute(
        select(Measurement).where(
            Measurement.astronaut_id == astronaut_id,
            Measurement.mission_day >= 1,
            Measurement.mission_day <= LEARNING_DAYS,
        )
    ).scalars().all()


def _daily_sleep_efficiency(rows) -> list[tuple[int, float]]:
    tst, tib = {}, {}
    for r in rows:
        if r.variable == "sleep_total_h":
            tst[r.timestamp] = (r.mission_day, r.value)
        elif r.variable == "sleep_time_in_bed_h":
            tib[r.timestamp] = r.value
    out = []
    for ts, (day, v) in tst.items():
        eff = stats.sleep_efficiency(v, tib.get(ts))
        if eff is not None:
            out.append((day, eff))
    return out


def compute_baseline(db: Session, astronaut_id: str) -> dict:
    """Return per-variable baseline statistics and readiness for one astronaut."""
    rows = _learning_rows(db, astronaut_id)
    exercise_ts = {r.timestamp for r in rows
                   if r.variable == "activity_level" and r.value >= 2}

    series = defaultdict(list)          # variable -> [(day, value, timestamp, quality)]
    for r in rows:
        if r.variable in EXPECTED_PER_DAY:
            series[r.variable].append((r.mission_day, r.value, r.timestamp, r.quality))
    series["sleep_efficiency"] = [(d, v, "", "fair") for d, v in _daily_sleep_efficiency(rows)]

    result = {}
    for var, expected_per_day in EXPECTED_PER_DAY.items():
        obs = series.get(var, [])
        values_all = [o[1] for o in obs]
        used = [o[1] for o in obs
                if not (var in EXERCISE_SENSITIVE and o[2] in exercise_ts)]
        days_with_data = len({o[0] for o in obs})
        coverage = stats.completeness(len(values_all), expected_per_day * LEARNING_DAYS)

        ready = (coverage is not None and coverage >= MIN_COVERAGE_PCT
                 and days_with_data >= MIN_DAYS_WITH_DATA and len(used) >= 2)
        mu, sd = stats.mean(used), stats.std(used)
        result[var] = {
            "n_valid": len(values_all),
            "n_used": len(used),
            "excluded_exercise": var in EXERCISE_SENSITIVE,
            "days_with_data": days_with_data,
            "coverage_pct": coverage,
            "mean": mu,
            "median": stats.median(used),
            "std": sd,
            "variance": stats.variance(used),
            "min": stats.minimum(used),
            "max": stats.maximum(used),
            "iqr": stats.iqr(used),
            "cv_pct": stats.cv(used),
            "mad": stats.mad(used),
            # Demonstration-only preliminary personal range: mean +/- 2 SD.
            "range_low": None if mu is None or sd is None else mu - 2 * sd,
            "range_high": None if mu is None or sd is None else mu + 2 * sd,
            "status": READY if ready else NOT_READY,
        }
    return result


def profile_status(baseline: dict) -> str:
    """The profile is ready only if every core variable is ready."""
    core = ["heart_rate", "spo2", "resp_rate", "sleep_total_h"]
    return READY if all(baseline[v]["status"] == READY for v in core) else NOT_READY
