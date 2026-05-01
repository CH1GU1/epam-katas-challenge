from katas.nth_letter_kata import nth_letter


def test_nth_letter_basic() -> None:
    assert nth_letter(["yoda", "best", "has"]) == "yes"


def test_nth_letter_single_word() -> None:
    assert nth_letter(["python"]) == "p"


def test_nth_letter_empty_list() -> None:
    assert nth_letter([]) == ""


def test_nth_letter_multiple_words() -> None:
    assert nth_letter(["abcd", "efgh", "ijkl", "mnop"]) == "afkp"


def test_nth_letter_preserves_case() -> None:
    assert nth_letter(["Yo", "bEst", "hAS"]) == "YES"


def test_nth_letter_non_alpha() -> None:
    assert nth_letter(["1st", "_ok", "!go"]) == "1oo"
