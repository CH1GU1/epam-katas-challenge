import { DictionaryChallenge } from "@/components/challenges/DictionaryChallenge"
import { NthLetterChallenge } from "@/components/challenges/NthLetterChallenge"
import { ShoppingChallenge } from "@/components/challenges/ShoppingChallenge"

export const App = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-3xl font-semibold">Kata Challenges</h1>
          <p className="text-sm text-muted-foreground">
            3 interactive challenges | EPAM Kevin Mera
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DictionaryChallenge />
          <ShoppingChallenge />
          <NthLetterChallenge />
        </div>
      </div>
    </div>
  )
}
