export type DictionaryAddRequest = {
	word: string
	definition: string
}

export type DictionaryAddResponse = {
	message: string
}

export type DictionaryLookRequest = {
	word: string
}

export type DictionaryLookResponse = {
	word: string
	definition: string
	found: boolean
}

export type ShoppingTotalRequest = {
	costs: Record<string, number>
	items: string[]
	tax: number
}

export type ShoppingTotalResponse = {
	items_found: string[]
	items_ignored: string[]
	subtotal: number
	tax_amount: number
	total: number
}

export type NthLetterDecodeRequest = {
	words: string[]
}

export type NthLetterDecodeBreakdownItem = {
	word: string
	position: number
	letter: string
}

export type NthLetterDecodeResponse = {
	result: string
	breakdown: NthLetterDecodeBreakdownItem[]
}
