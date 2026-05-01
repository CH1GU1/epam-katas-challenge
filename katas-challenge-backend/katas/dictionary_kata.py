class Dictionary:
    def __init__(self) -> None:
        self._entries = {}

    def newentry(self, word: str, definition: str) -> None:
        self._entries[word] = definition

    def look(self, word: str) -> str:
        if word in self._entries:
            return self._entries[word]
        return f"Can't find entry for {word}"
