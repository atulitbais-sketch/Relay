from relay_agent import __version__, health_check


def test_package_version() -> None:
    assert __version__ == "0.1.0"


def test_health_check() -> None:
    assert health_check() == {
        "status": "ok",
        "service": "relay-agent",
        "version": "0.1.0",
    }
