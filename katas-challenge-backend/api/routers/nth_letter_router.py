from fastapi import APIRouter
from pydantic import BaseModel

from katas.nth_letter_kata import nth_letter

router = APIRouter(prefix="/nth-letter", tags=["nth-letter"])


class NthLetterPayload(BaseModel):
    words: list[str]


@router.post("/decode")
def decode(payload: NthLetterPayload) -> dict:
    result = nth_letter(payload.words)
    breakdown = [
        {"word": word, "position": index, "letter": word[index]}
        for index, word in enumerate(payload.words)
    ]

    return {"result": result, "breakdown": breakdown}
