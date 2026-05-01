import { useMutation } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type {
	NthLetterDecodeRequest,
	NthLetterDecodeResponse,
} from "@/types/api.types"

export const useNthLetter = () => {
	const decodeMutation = useMutation<
		NthLetterDecodeResponse,
		Error,
		NthLetterDecodeRequest
	>({
		mutationFn: async (payload) => {
			const { data } = await api.post<NthLetterDecodeResponse>(
				"/nth-letter/decode",
				payload
			)

			return data
		},
	})

	return {
		decodeMutation,
	}
}
