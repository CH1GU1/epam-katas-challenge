from katas.dictionary_kata import Dictionary


def test_newentry_and_look_returns_definition() -> None:
    d = Dictionary()
    d.newentry("Apple", "A fruit that grows on trees")
    assert d.look("Apple") == "A fruit that grows on trees"


def test_look_missing_returns_message() -> None:
    d = Dictionary()
    assert d.look("Banana") == "Can't find entry for Banana"


def test_newentry_overwrites_existing_definition() -> None:
    d = Dictionary()
    d.newentry("Apple", "First")
    d.newentry("Apple", "Second")
    assert d.look("Apple") == "Second"


def test_empty_definition_is_allowed() -> None:
    d = Dictionary()
    d.newentry("EmptyDef", "")
    assert d.look("EmptyDef") == ""


def test_case_sensitive_keys() -> None:
    d = Dictionary()
    d.newentry("Apple", "Upper")
    assert d.look("apple") == "Can't find entry for apple"


def test_empty_word_key_is_allowed() -> None:
    d = Dictionary()
    d.newentry("", "Blank")
    assert d.look("") == "Blank"
