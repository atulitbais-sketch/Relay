import os
import ssl
import asyncpg
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

COCKROACH_INSECURE = os.getenv("COCKROACH_INSECURE", "false").lower() == "true"
COCKROACH_HOST = os.getenv("COCKROACH_HOST", "localhost")
COCKROACH_PORT = int(os.getenv("COCKROACH_PORT", "26257"))
COCKROACH_USER = os.getenv("COCKROACH_USER", "root")
COCKROACH_PASSWORD = os.getenv("COCKROACH_PASSWORD", "")
COCKROACH_DATABASE = os.getenv("COCKROACH_DATABASE", "relay_db")
COCKROACH_CLUSTER = os.getenv("COCKROACH_CLUSTER")  # Serverless only
COCKROACH_CA_CERT_PATH = os.getenv("COCKROACH_CA_CERT_PATH")


class _DBState:
    pool: Optional[asyncpg.pool.Pool] = None


_state = _DBState()


def _build_ssl_context() -> Optional[ssl.SSLContext]:
    if COCKROACH_INSECURE:
        return None
    if not COCKROACH_CA_CERT_PATH or not os.path.exists(COCKROACH_CA_CERT_PATH):
        raise FileNotFoundError(
            f"CA cert not found at COCKROACH_CA_CERT_PATH='{COCKROACH_CA_CERT_PATH}'. "
            "Download it from the CockroachCloud 'Connect' dialog and update .env."
        )
    ctx = ssl.create_default_context(cafile=COCKROACH_CA_CERT_PATH)
    return ctx


async def connect_db() -> asyncpg.pool.Pool:
    if _state.pool is None:
        server_settings = {}
        if COCKROACH_CLUSTER:
            server_settings["options"] = f"--cluster={COCKROACH_CLUSTER}"

        _state.pool = await asyncpg.create_pool(
            host=COCKROACH_HOST,
            port=COCKROACH_PORT,
            user=COCKROACH_USER,
            password=COCKROACH_PASSWORD,
            database=COCKROACH_DATABASE,
            ssl=_build_ssl_context(),
            server_settings=server_settings,
            min_size=2,
            max_size=10,
            command_timeout=30,
        )
    return _state.pool


async def disconnect_db() -> None:
    if _state.pool is not None:
        await _state.pool.close()
        _state.pool = None


async def get_pool() -> asyncpg.pool.Pool:
    if _state.pool is None:
        await connect_db()
    return _state.pool