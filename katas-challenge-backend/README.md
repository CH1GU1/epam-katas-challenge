# Katas Challenge Backend

> FastAPI REST API for EPAM Katas Challenge. Exposes 3 endpoints to solve programming challenges.

## 🚀 Tech Stack

- **Python 3.11**
- **FastAPI** — Modern, fast web framework
- **Uvicorn** — ASGI server
- **Pydantic** — Data validation and serialization
- **Pytest + pytest-cov** — Testing and coverage
- **Ruff** — Ultra-fast linter and formatter
- **httpx** — HTTP client for tests

## 📁 Structure

```
katas-challenge-backend/
├── api/
│   ├── main.py              # FastAPI entry point
│   └── routers/
│       ├── dictionary_router.py    # Dictionary CRUD
│       ├── nth_letter_router.py    # Decoder
│       └── shopping_router.py      # Shopping calculator
├── katas/                   # Pure challenge logic
│   ├── dictionary_kata.py
│   ├── nth_letter_kata.py
│   └── shopping_kata.py
├── tests/                   # Unit tests
│   ├── test_api_main.py
│   ├── test_api_routers.py
│   ├── test_dictionary.py
│   ├── test_nth_letter.py
│   └── test_shopping.py
├── Dockerfile
└── requirements.txt
```

## 🛠️ Scripts

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest

# Tests with coverage
pytest --cov=api --cov=katas --cov-report=xml

# Linter
ruff check .
```

## 📡 Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/health` | Health check | — |
| `POST` | `/dictionary/add` | Add entry | `{"word": "...", "definition": "..."}` |
| `POST` | `/dictionary/look` | Look up word | `{"word": "..."}` |
| `POST` | `/shopping/total` | Calculate total | `{"costs": {...}, "items": [...], "tax": N}` |
| `POST` | `/nth-letter/decode` | Decode | `{"words": [...]}` |

### Interactive Documentation

Once the server is running:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧩 Implemented Katas

### Dictionary (`dictionary_kata.py`)
```python
class Dictionary:
    def newentry(self, word: str, definition: str) -> None
    def look(self, word: str) -> str
```

### Shopping (`shopping_kata.py`)
```python
def get_total(costs: dict[str, float], items: Iterable[str], tax: float) -> float
```

### Nth Letter (`nth_letter_kata.py`)
```python
def nth_letter(words: list[str]) -> str
```

## 🧪 Testing

```bash
# All tests
pytest

# Verbose
pytest -v

# HTML coverage
pytest --cov=api --cov=katas --cov-report=html
# Open htmlcov/index.html
```

## 🐳 Docker

```bash
# Build
docker build -t katas-backend .

# Run
docker run -p 8000:8000 katas-backend
```

---

**[⬅ Back to main README](../README.md)**
