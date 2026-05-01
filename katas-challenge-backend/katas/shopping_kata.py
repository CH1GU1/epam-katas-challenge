from typing import Iterable


def _normalize_tax(tax: float) -> float:
    if tax > 1:
        return tax / 100
    return tax


def get_total(costs: dict[str, float], items: Iterable[str], tax: float) -> float:
    subtotal = 0.0
    for item in items:
        if item in costs:
            subtotal += float(costs[item])

    tax_rate = _normalize_tax(tax)
    total = subtotal * (1 + tax_rate)
    return round(total, 2)
