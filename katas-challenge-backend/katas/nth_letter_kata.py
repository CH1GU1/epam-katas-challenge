def nth_letter(words: list[str]) -> str:
    return "".join(word[index] for index, word in enumerate(words))
