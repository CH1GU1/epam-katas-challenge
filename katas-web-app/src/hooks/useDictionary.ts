import { useMutation } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type {
	DictionaryAddRequest,
	DictionaryAddResponse,
	DictionaryLookRequest,
	DictionaryLookResponse,
} from "@/types/api.types"

export const useDictionary = () => {
	const addEntryMutation = useMutation<
		DictionaryAddResponse,
		Error,
		DictionaryAddRequest
	>({
		mutationFn: async (payload) => {
			const { data } = await api.post<DictionaryAddResponse>(
				"/dictionary/add",
				payload
			)

			return data
		},
	})

	const lookEntryMutation = useMutation<
		DictionaryLookResponse,
		Error,
		DictionaryLookRequest
	>({
		mutationFn: async (payload) => {
			const { data } = await api.post<DictionaryLookResponse>(
				"/dictionary/look",
				payload
			)

			return data
		},
	})

	return {
		addEntryMutation,
		lookEntryMutation,
	}
}
