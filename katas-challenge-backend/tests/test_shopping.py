from katas.shopping_kata import get_total


def test_get_total_basic_items() -> None:
    costs = {"socks": 5, "shoes": 60, "sweater": 30}
    assert get_total(costs, ["socks", "shoes"], 0.09) == 70.85


def test_get_total_ignores_missing_items() -> None:
    costs = {"socks": 5, "shoes": 60}
    assert get_total(costs, ["socks", "ghost"], 0.09) == 5.45


def test_get_total_empty_cart_returns_zero() -> None:
    costs = {"socks": 5}
    assert get_total(costs, [], 0.09) == 0.0


def test_get_total_rounding() -> None:
    costs = {"gum": 0.335}
    assert get_total(costs, ["gum"], 0.0) == 0.34


def test_get_total_no_tax() -> None:
    costs = {"socks": 5, "shoes": 60}
    assert get_total(costs, ["socks", "shoes"], 0.0) == 65.0


def test_get_total_repeated_items() -> None:
    costs = {"socks": 5}
    assert get_total(costs, ["socks", "socks"], 0.1) == 11.0


def test_get_total_tax_as_percentage() -> None:
    costs = {"socks": 5, "shoes": 60}
    assert get_total(costs, ["socks", "shoes"], 9.0) == 70.85
