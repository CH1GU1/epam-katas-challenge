import { useState } from "react"

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
import { useDictionary } from "@/hooks/useDictionary"
import type { DictionaryLookResponse } from "@/types/api.types"

export const DictionaryChallenge = () => {
  const { addEntryMutation, lookEntryMutation } = useDictionary()
  const [word, setWord] = useState("")
  const [definition, setDefinition] = useState("")
  const [searchWord, setSearchWord] = useState("")
  const [lookResult, setLookResult] = useState<DictionaryLookResponse | null>(
    null
  )
  const [addFeedback, setAddFeedback] = useState<
    "success" | "error" | null
  >(null)

  const handleAdd = () => {
    const trimmedWord = word.trim()
    const trimmedDefinition = definition.trim()
    if (!trimmedWord || !trimmedDefinition) {
      return
    }

    setAddFeedback(null)
    addEntryMutation.mutate(
      { word: trimmedWord, definition: trimmedDefinition },
      {
        onSuccess: () => {
          setAddFeedback("success")
          setWord("")
          setDefinition("")
        },
        onError: () => {
          setAddFeedback("error")
        },
      }
    )
  }

  const handleLook = () => {
    const trimmedSearch = searchWord.trim()
    if (!trimmedSearch) {
      return
    }

    lookEntryMutation.mutate(
      { word: trimmedSearch },
      {
        onSuccess: (data) => {
          setLookResult(data)
        },
        onError: () => {
          setLookResult(null)
        },
      }
    )
  }

  const isAddDisabled =
    addEntryMutation.isPending || !word.trim() || !definition.trim()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dictionary</CardTitle>
        <CardDescription>
          Add and look up words with their definitions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Add word</h3>
            <Input
              placeholder="Word"
              value={word}
              onChange={(event) => setWord(event.target.value)}
            />
            <Input
              placeholder="Definition"
              value={definition}
              onChange={(event) => setDefinition(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleAdd} disabled={isAddDisabled}>
              Add
            </Button>
            {addFeedback === "success" ? (
              <Badge className="bg-emerald-500 text-white">
                Word added!
              </Badge>
            ) : null}
            {addFeedback === "error" ? (
              <Badge variant="destructive">Failed to add</Badge>
            ) : null}
          </div>
        </section>

        <section className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Search word</h3>
            <Input
              placeholder="Search word"
              value={searchWord}
              onChange={(event) => setSearchWord(event.target.value)}
            />
          </div>
          <Button
            onClick={handleLook}
            disabled={lookEntryMutation.isPending}
          >
            Search
          </Button>
          {lookResult ? (
            <div className="space-y-2">
              <Badge
                className={
                  lookResult.found
                    ? "bg-emerald-500 text-white"
                    : undefined
                  }
                variant={lookResult.found ? "default" : "destructive"}
              >
                {lookResult.found ? "Found" : "Not found"}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {lookResult.found
                  ? lookResult.definition
                  : "Not found"}
              </p>
            </div>
          ) : null}
        </section>
      </CardContent>
    </Card>
  )
}
