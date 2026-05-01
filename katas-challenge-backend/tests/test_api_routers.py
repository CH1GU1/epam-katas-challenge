from fastapi.testclient import TestClient

from api.main import app


client = TestClient(app)


def test_dictionary_add_and_look() -> None:
    payload = {"word": "Apple-001", "definition": "A fruit"}
    response = client.post("/dictionary/add", json=payload)

    assert response.status_code == 200
    assert response.json() == {"message": "Entry 'Apple-001' added successfully"}

    response = client.post("/dictionary/look", json={"word": "Apple-001"})

    assert response.status_code == 200
    assert response.json() == {
        "word": "Apple-001",
        "definition": "A fruit",
        "found": True,
    }


def test_dictionary_look_missing() -> None:
    response = client.post("/dictionary/look", json={"word": "Missing-999"})

    assert response.status_code == 200
    assert response.json() == {
        "word": "Missing-999",
        "definition": "",
        "found": False,
    }


def test_nth_letter_decode() -> None:
    response = client.post(
        "/nth-letter/decode",
        json={"words": ["yoda", "best", "has"]},
    )

    assert response.status_code == 200
    assert response.json() == {
        "result": "yes",
        "breakdown": [
            {"word": "yoda", "position": 0, "letter": "y"},
            {"word": "best", "position": 1, "letter": "e"},
            {"word": "has", "position": 2, "letter": "s"},
        ],
    }


def test_shopping_total() -> None:
    response = client.post(
        "/shopping/total",
        json={
            "costs": {"socks": 5, "shoes": 60},
            "items": ["socks", "ghost", "shoes"],
            "tax": 9.0,
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "items_found": ["socks", "shoes"],
        "items_ignored": ["ghost"],
        "subtotal": 65.0,
        "tax_amount": 5.85,
        "total": 70.85,
    }
