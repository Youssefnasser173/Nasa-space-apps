"""Pure statistics helpers (no database). Every function ignores None/NaN
and returns None when a value cannot be computed safely."""
import math
from typing import Optional, Sequence

ROBUST_Z_CONST = 0.6745


def clean(values: Sequence) -> list[float]:
    out = []
    for v in values:
        if v is None:
            continue
        f = float(v)
        if not math.isnan(f):
            out.append(f)
    return out


def mean(x) -> Optional[float]:
    x = clean(x)
    return sum(x) / len(x) if x else None


def variance(x) -> Optional[float]:
    """Population variance: sum((x - mu)^2) / n."""
    x = clean(x)
    if not x:
        return None
    mu = sum(x) / len(x)
    return sum((v - mu) ** 2 for v in x) / len(x)


def std(x) -> Optional[float]:
    v = variance(x)
    return math.sqrt(v) if v is not None else None


def median(x) -> Optional[float]:
    x = sorted(clean(x))
    n = len(x)
    if n == 0:
        return None
    mid = n // 2
    return x[mid] if n % 2 else (x[mid - 1] + x[mid]) / 2


def minimum(x) -> Optional[float]:
    x = clean(x)
    return min(x) if x else None


def maximum(x) -> Optional[float]:
    x = clean(x)
    return max(x) if x else None


def percentile(x, q: float) -> Optional[float]:
    """Linear-interpolation percentile, q in [0, 100]."""
    x = sorted(clean(x))
    if not x:
        return None
    pos = (len(x) - 1) * q / 100
    lo, hi = math.floor(pos), math.ceil(pos)
    return x[lo] + (x[hi] - x[lo]) * (pos - lo)


def iqr(x) -> Optional[float]:
    q1, q3 = percentile(x, 25), percentile(x, 75)
    return None if q1 is None else q3 - q1


def cv(x) -> Optional[float]:
    """Coefficient of variation (%) = sigma / mu * 100. None if mu is 0."""
    mu, sd = mean(x), std(x)
    if mu is None or sd is None or mu == 0:
        return None
    return sd / abs(mu) * 100


def mad(x) -> Optional[float]:
    """Median absolute deviation: median(|x - median(x)|)."""
    x = clean(x)
    m = median(x)
    return None if m is None else median([abs(v - m) for v in x])


def z_score(value: float, mu: Optional[float], sigma: Optional[float]) -> Optional[float]:
    """Z = (x - mu) / sigma. None when sigma is 0 or missing."""
    if value is None or mu is None or not sigma:
        return None
    return (value - mu) / sigma


def robust_z(value: float, med: Optional[float], mad_value: Optional[float]) -> Optional[float]:
    """Robust Z = 0.6745 * (x - median) / MAD. None when MAD is 0 or missing."""
    if value is None or med is None or not mad_value:
        return None
    return ROBUST_Z_CONST * (value - med) / mad_value


def rolling_mean(x: Sequence, window: int) -> list[Optional[float]]:
    out = []
    for i in range(len(x)):
        seg = clean(x[max(0, i - window + 1): i + 1])
        out.append(sum(seg) / len(seg) if seg else None)
    return out


def ema(x: Sequence, alpha: float = 0.3) -> list[Optional[float]]:
    """EMA_t = alpha * x_t + (1 - alpha) * EMA_{t-1}. Missing values carry forward."""
    out, prev = [], None
    for v in x:
        if v is None or (isinstance(v, float) and math.isnan(v)):
            out.append(prev)
            continue
        prev = float(v) if prev is None else alpha * float(v) + (1 - alpha) * prev
        out.append(prev)
    return out


def trend_slope(y: Sequence, t: Optional[Sequence] = None) -> Optional[float]:
    """Least-squares slope of y over t (units of y per unit of t)."""
    t = list(range(len(y))) if t is None else list(t)
    pairs = [(float(a), float(b)) for a, b in zip(t, y)
             if b is not None and not (isinstance(b, float) and math.isnan(b))]
    if len(pairs) < 2:
        return None
    tm = sum(p[0] for p in pairs) / len(pairs)
    ym = sum(p[1] for p in pairs) / len(pairs)
    den = sum((p[0] - tm) ** 2 for p in pairs)
    return None if den == 0 else sum((p[0] - tm) * (p[1] - ym) for p in pairs) / den


def pct_change(current: Optional[float], baseline: Optional[float]) -> Optional[float]:
    """Change (%) = (current - baseline) / baseline * 100."""
    if current is None or baseline in (None, 0):
        return None
    return (current - baseline) / baseline * 100


def completeness(valid: int, expected: int) -> Optional[float]:
    """Completeness (%) = valid / expected * 100."""
    return None if not expected else valid / expected * 100


def sleep_efficiency(total_sleep: Optional[float], time_in_bed: Optional[float]) -> Optional[float]:
    """Sleep efficiency (%) = total sleep time / time in bed * 100."""
    if total_sleep is None or not time_in_bed:
        return None
    return total_sleep / time_in_bed * 100
