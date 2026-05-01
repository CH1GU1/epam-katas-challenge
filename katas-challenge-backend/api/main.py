from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.dictionary_router import router as dictionary_router
from api.routers.nth_letter_router import router as nth_letter_router
from api.routers.shopping_router import router as shopping_router

app = FastAPI(title="Kata Challenge API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dictionary_router)
app.include_router(shopping_router)
app.include_router(nth_letter_router)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
