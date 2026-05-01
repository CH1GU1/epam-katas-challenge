from fastapi import APIRouter
from pydantic import BaseModel

from katas.dictionary_kata import Dictionary

router = APIRouter(prefix="/dictionary", tags=["dictionary"])
_dictionary = Dictionary()


class EntryPayload(BaseModel):
    word: str
    definition: str


class LookPayload(BaseModel):
    word: str


@router.post("/add")
def add_entry(payload: EntryPayload) -> dict:
    _dictionary.newentry(payload.word, payload.definition)
    return {"message": f"Entry '{payload.word}' added successfully"}


@router.post("/look")
def look_entry(payload: LookPayload) -> dict:
    result = _dictionary.look(payload.word)
    found = not result.startswith("Can't find entry for ")
    return {"word": payload.word, "definition": result if found else "", "found": found}
