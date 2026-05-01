import { useEffect, useMemo, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNthLetter } from "@/hooks/useNthLetter"
import type { NthLetterDecodeResponse } from "@/types/api.types"

const DEFAULT_WORDS = ["yoda", "best", "has"]

export const NthLetterChallenge = () => {
  const { decodeMutation } = useNthLetter()
  const [words, setWords] = useState<string[]>(DEFAULT_WORDS)
  const [result, setResult] = useState<NthLetterDecodeResponse | null>(null)
  const [pendingFocusIndex, setPendingFocusIndex] = useState<number | null>(
    null
  )
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (pendingFocusIndex === null) {
      return
    }

    const input = inputRefs.current[pendingFocusIndex]
    if (input) {
      input.focus()
    }
    setPendingFocusIndex(null)
  }, [pendingFocusIndex, words.length])

  const hasEmptyWord = useMemo(
    () => words.some((word) => word.trim().length === 0),
    [words]
  )

  const updateWords = (updater: (prev: string[]) => string[]) => {
    setWords((prev) => {
      const next = updater(prev)
      return next
    })
    if (result) {
      setResult(null)
    }
  }

  const handleWordChange = (index: number, value: string) => {
    updateWords((prev) =>
      prev.map((word, currentIndex) =>
        currentIndex === index ? value : word
      )
    )
  }

  const handleAddWord = () => {
    updateWords((prev) => {
      const nextIndex = prev.length
      setPendingFocusIndex(nextIndex)
      return [...prev, ""]
    })
  }

  const handleRemoveWord = (index: number) => {
    if (words.length <= 1) {
      return
    }
    updateWords((prev) => prev.filter((_, currentIndex) => currentIndex !== index))
  }

  const handleDecode = () => {
    if (hasEmptyWord) {
      return
    }

    decodeMutation.mutate(
      { words: words.map((word) => word.trim()) },
      {
        onSuccess: (data) => {
          setResult(data)
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nth Letter</CardTitle>
        <CardDescription>
          Enter words to decode the secret word.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Word list</h3>
          <div className="space-y-3">
            {words.map((word, index) => (
              <div
                key={`word-${index}`}
                className="flex items-center gap-3"
              >
                <Input
                  ref={(element) => {
                    inputRefs.current[index] = element
                  }}
                  value={word}
                  onChange={(event) =>
                    handleWordChange(index, event.target.value)
                  }
                  placeholder={`Word ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveWord(index)}
                  disabled={words.length <= 1}
                >
                  x
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddWord}>
              +
            </Button>
          </div>
        </section>

        <section>
          <Button
            onClick={handleDecode}
            disabled={hasEmptyWord || decodeMutation.isPending}
          >
            Decode
          </Button>
        </section>

        {result ? (
          <section className="space-y-3">
            <h3 className="text-sm font-medium">Result</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {result.breakdown.map((item) => (
                <div
                  key={`${item.word}-${item.position}`}
                  className="flex flex-wrap items-center gap-2"
                >
                  <span>
                    {item.word} -&gt; position {item.position} -&gt;
                  </span>
                  <Badge className="bg-emerald-500 text-white">
                    {item.letter}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="text-lg font-semibold">
              Secret word: {result.result}
            </div>
          </section>
        ) : null}
      </CardContent>
    </Card>
  )
}
