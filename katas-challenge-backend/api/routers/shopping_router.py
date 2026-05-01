from fastapi import APIRouter
from pydantic import BaseModel

from katas.shopping_kata import get_total

router = APIRouter(prefix="/shopping", tags=["shopping"])


class ShoppingPayload(BaseModel):
    costs: dict[str, float]
    items: list[str]
    tax: float


@router.post("/total")
def total(payload: ShoppingPayload) -> dict:
    items_found = [item for item in payload.items if item in payload.costs]
    items_ignored = [item for item in payload.items if item not in payload.costs]
    subtotal = sum(payload.costs[item] for item in items_found)
    total_value = get_total(payload.costs, payload.items, payload.tax)
    tax_rate = payload.tax / 100 if payload.tax > 1 else payload.tax
    tax_amount = round(subtotal * tax_rate, 2)

    return {
        "items_found": items_found,
        "items_ignored": items_ignored,
        "subtotal": round(subtotal, 2),
        "tax_amount": tax_amount,
        "total": total_value,
    }
