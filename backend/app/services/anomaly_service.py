"""Explainable statistical anomaly detection against each astronaut's own baseline.

Methods (all demonstration thresholds, NOT clinically validated):
  1. Isolated deviation  : |Z| >= 3.5 and |Robust Z| >= 3.5 on a single observation.
  2. Persistent deviation: daily-mean Z >= 3 (same sign) for >= 3 consecutive days.
                           Daily Z = (daily mean - mu) / (sigma / sqrt(n_obs_that_day)).
  3. Multiple-indicator  : >= 3 core indicators in a persistent deviation at once.
A flag is a statistical observation for medical review, not a diagnosis.
"""
import math
from collections import defaultdict

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.measurement import Measurement
from app.services import stats
from app.services.baseline_service import (EXERCISE_SENSITIVE, LEARNING_DAYS, READY,
                                           compute_baseline)

Z_ISOLATED = 3.5
Z_DAILY = 3.0
MIN_PERSISTENT_DAYS = 3
MIN_MULTI = 3
EMA_ALPHA = 0.3
CORE_MULTI = ["heart_rate", "spo2", "resp_rate", "sleep_total_h", "eda"]
MONITORED = ["heart_rate", "bp_systolic", "bp_diastolic", "spo2", "resp_rate",
             "skin_temp", "eda", "sleep_total_h", "hydration_index",
             "radiation_absorbed_dose"]
ENVIRONMENTAL = {"radiation_absorbed_dose"}
DEMO_NOTE = "Demonstration-only thresholds; statistical flag, not a diagnosis."
REVIEW = "Suggest review by the flight surgeon / medical team."


def _load(db: Session, astronaut_id: str):
    rows = db.execute(
        select(Measurement).where(Measurement.astronaut_id == astronaut_id,
                                  Measurement.mission_day > LEARNING_DAYS)
        .order_by(Measurement.timestamp)).scalars().all()
    exercise_ts = {r.timestamp for r in rows
                   if r.variable == "activity_level" and r.value >= 2}
    series = defaultdict(list)
    for r in rows:
        if r.variable in MONITORED:
            if r.variable in EXERCISE_SENSITIVE and r.timestamp in exercise_ts:
                continue
            series[r.variable].append(r)
    return series


def _worst_quality(rows) -> str:
    return "fair" if any(r.quality != "good" for r in rows) else "good"


def _fmt(v, nd=1):
    return f"{v:.{nd}f}"


def detect_anomalies(db: Session, astronaut_id: str) -> list[dict]:
    baseline = compute_baseline(db, astronaut_id)
    if any(baseline[v]["status"] != READY for v in ("heart_rate", "spo2", "resp_rate", "sleep_total_h")):
        return [{"astronaut_id": astronaut_id, "category": "data_quality_warning",
                 "variable": None, "explanation": "Baseline not ready: INSUFFICIENT DATA - CONTINUE LEARNING.",
                 "status": "new", "timestamp": None}]

    series = _load(db, astronaut_id)
    alerts, persistent = [], {}          # persistent[var] = list of (start, end)

    for var, obs in series.items():
        b = baseline[var]
        mu, sd, med, mad = b["mean"], b["std"], b["median"], b["mad"]
        if b["status"] != READY or not sd:
            continue
        unit = obs[0].unit

        # --- persistent deviation (daily means) ---
        by_day = defaultdict(list)
        for r in obs:
            by_day[r.mission_day].append(r)
        days = sorted(by_day)
        dz = {}
        for d in days:
            vals = [r.value for r in by_day[d]]
            dz[d] = (stats.mean(vals) - mu) / (sd / math.sqrt(len(vals)))
        runs, cur = [], []
        for d in days:
            sign = 1 if dz[d] > 0 else -1
            if abs(dz[d]) >= Z_DAILY and cur and d == cur[-1] + 1 and sign == (1 if dz[cur[-1]] > 0 else -1):
                cur.append(d)
            elif abs(dz[d]) >= Z_DAILY:
                if len(cur) >= MIN_PERSISTENT_DAYS:
                    runs.append(cur)
                cur = [d]
            else:
                if len(cur) >= MIN_PERSISTENT_DAYS:
                    runs.append(cur)
                cur = []
        if len(cur) >= MIN_PERSISTENT_DAYS:
            runs.append(cur)

        covered = set()
        daily_means = [stats.mean([r.value for r in by_day[d]]) for d in days]
        ema_all = dict(zip(days, stats.ema(daily_means, EMA_ALPHA)))
        for run in runs:
            persistent.setdefault(var, []).append((run[0], run[-1]))
            covered.update(run)
            run_vals = [r.value for d in run for r in by_day[d]]
            m = stats.mean(run_vals)
            chg = stats.pct_change(m, mu)
            slope = stats.trend_slope([stats.mean([r.value for r in by_day[d]]) for d in run], run)
            cat = "environmental_exposure_observation" if var in ENVIRONMENTAL else "persistent_deviation"
            alerts.append({
                "astronaut_id": astronaut_id, "timestamp": by_day[run[0]][0].timestamp,
                "variable": var, "category": cat,
                "current_value": round(m, 3), "unit": unit,
                "baseline_mean": round(mu, 3), "baseline_sd": round(sd, 3),
                "deviation_z": round(stats.mean([dz[d] for d in run]), 2),
                "change_pct": None if chg is None else round(chg, 1),
                "duration_days": len(run), "start_day": run[0], "end_day": run[-1],
                "ongoing": run[-1] == days[-1],
                "detection_method": "Daily-mean Z-score, persistence >= 3 days",
                "ema_last": round(ema_all[run[-1]], 3), "trend_per_day": None if slope is None else round(slope, 3),
                "data_quality": _worst_quality([r for d in run for r in by_day[d]]),
                "supporting_indicators": [],
                "explanation": (f"{var} averaged {_fmt(m, 2)} {unit} over mission days {run[0]}-{run[-1]}, "
                                f"versus a personal baseline of {_fmt(mu, 2)} +/- {_fmt(sd, 2)} {unit}"
                                f"{'' if chg is None else f' ({chg:+.1f}%)'}; "
                                f"the deviation persisted {len(run)} consecutive days. {DEMO_NOTE}"),
                "suggested_review": REVIEW, "status": "new",
            })

        # --- isolated deviation (single observations) ---
        for r in obs:
            if r.mission_day in covered:
                continue
            z = stats.z_score(r.value, mu, sd)
            rz = stats.robust_z(r.value, med, mad)
            if z is not None and rz is not None and abs(z) >= Z_ISOLATED and abs(rz) >= Z_ISOLATED:
                alerts.append({
                    "astronaut_id": astronaut_id, "timestamp": r.timestamp, "variable": var,
                    "category": "unusual_deviation",
                    "current_value": r.value, "unit": r.unit,
                    "baseline_mean": round(mu, 3), "baseline_sd": round(sd, 3),
                    "deviation_z": round(z, 2), "robust_z": round(rz, 2),
                    "change_pct": None if stats.pct_change(r.value, mu) is None else round(stats.pct_change(r.value, mu), 1),
                    "duration_days": 0, "start_day": r.mission_day, "end_day": r.mission_day,
                    "ongoing": False, "detection_method": "Z-score and Robust Z-score (both >= 3.5)",
                    "data_quality": r.quality, "supporting_indicators": [],
                    "explanation": (f"Single {var} reading of {_fmt(r.value, 2)} {r.unit} on mission day {r.mission_day} "
                                    f"is {z:+.1f} SD (robust Z {rz:+.1f}) from the personal baseline "
                                    f"{_fmt(mu, 2)} +/- {_fmt(sd, 2)}. Isolated reading, no persistence. {DEMO_NOTE}"),
                    "suggested_review": "Check measurement quality first; review only if it repeats.",
                    "status": "new",
                })

    # --- multiple-indicator anomaly ---
    day_vars = defaultdict(set)
    for var in CORE_MULTI:
        for s, e in persistent.get(var, []):
            for d in range(s, e + 1):
                day_vars[d].add(var)
    seg, segs = [], []
    for d in sorted(day_vars):
        if len(day_vars[d]) >= MIN_MULTI and (not seg or d == seg[-1] + 1):
            seg.append(d)
        else:
            if seg:
                segs.append(seg)
            seg = [d] if len(day_vars[d]) >= MIN_MULTI else []
    if seg:
        segs.append(seg)
    for seg in segs:
        vs = sorted(set().union(*(day_vars[d] for d in seg)))
        first = next(r for r in series[vs[0]] if r.mission_day == seg[0])
        alerts.append({
            "astronaut_id": astronaut_id, "timestamp": first.timestamp,
            "variable": ", ".join(vs), "category": "multiple_indicator_anomaly",
            "start_day": seg[0], "end_day": seg[-1], "duration_days": len(seg),
            "ongoing": False, "detection_method": "Co-occurring persistent deviations (>= 3 core indicators)",
            "supporting_indicators": vs, "data_quality": "good",
            "explanation": (f"{len(vs)} indicators ({', '.join(vs)}) deviated from this astronaut's own baseline "
                            f"at the same time, from mission day {seg[0]}. Changes in several related "
                            f"indicators deserve more attention than one alone. {DEMO_NOTE}"),
            "suggested_review": REVIEW + " Priority above single-indicator flags.", "status": "new",
        })

    alerts.sort(key=lambda a: a["timestamp"] or "")
    for i, a in enumerate(alerts, 1):
        a["alert_id"] = f"{astronaut_id}-A{i:03d}"
    return alerts