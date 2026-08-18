"""Agent brain package for Project Relay."""

__version__ = "0.1.0"


def health_check() -> dict[str, str]:
    """Return basic package health information."""
    return {
        "status": "ok",
        "service": "relay-agent",
        "version": __version__,
    }
