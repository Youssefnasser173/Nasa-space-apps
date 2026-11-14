"""Create all tables. Importing the models registers them with Base."""
from app.db.base import Base
from app.db.session import engine
from app.models.astronaut import Astronaut          # noqa: F401
from app.models.measurement import Measurement      # noqa: F401
from app.models.research.dataset import Dataset     # noqa: F401


def init_db() -> None:
    Base.metadata.create_all(bind=engine)


def reset_db() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)