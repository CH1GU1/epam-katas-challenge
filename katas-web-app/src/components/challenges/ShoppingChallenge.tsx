import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useShopping } from "@/hooks/useShopping"
import type { ShoppingTotalResponse } from "@/types/api.types"

const CATALOG: Record<string, number> = {
  socks: 5,
  shoes: 60,
  sweater: 30,
  hat: 15,
  gloves: 20,
}

export const ShoppingChallenge = () => {
  const { calculateTotalMutation } = useShopping()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [tax, setTax] = useState(9)
  const [result, setResult] = useState<ShoppingTotalResponse | null>(null)
  const catalogEntries = useMemo(() => Object.entries(CATALOG), [])

  const handleToggle = (item: string, checked: boolean) => {
    setSelectedItems((prev) => {
      if (checked) {
        return prev.includes(item) ? prev : [...prev, item]
      }

      return prev.filter((entry) => entry !== item)
    })
  }

  const handleCalculate = () => {
    if (selectedItems.length === 0) {
      return
    }

    calculateTotalMutation.mutate(
      { costs: CATALOG, items: selectedItems, tax },
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
        <CardTitle>Shopping</CardTitle>
        <CardDescription>
          Select items and calculate the total with tax.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="space-y-3">
          <h3 className="text-sm font-medium">Catalog items</h3>
          <div className="space-y-2">
            {catalogEntries.map(([item, price]) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <Checkbox
                  id={`catalog-${item}`}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={(value) =>
                    handleToggle(item, value === true)
                  }
                />
                <Label htmlFor={`catalog-${item}`}>
                  {item} - ${price}
                </Label>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Tax</h3>
          <Label>Tax: {tax}%</Label>
          <Slider
            min={0}
            max={30}
            step={1}
            value={[tax]}
            onValueChange={(value) => {
              const [nextValue] = value
              if (typeof nextValue === "number") {
                setTax(nextValue)
              }
            }}
          />
        </section>

        <section className="space-y-2">
          <Button
            onClick={handleCalculate}
            disabled={
              selectedItems.length === 0 ||
              calculateTotalMutation.isPending
            }
          >
            Calculate total
          </Button>
          {selectedItems.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Select at least one item to calculate.
            </p>
          ) : null}
        </section>

        {result ? (
          <section className="space-y-2">
            <h3 className="text-sm font-medium">Result</h3>
            <p className="text-sm text-muted-foreground">
              Subtotal: ${result.subtotal.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              Tax applied: ${result.tax_amount.toFixed(2)}
            </p>
            <Badge className="bg-emerald-500 text-white">
              Total: ${result.total.toFixed(2)}
            </Badge>
          </section>
        ) : null}
      </CardContent>
    </Card>
  )
}
