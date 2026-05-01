import { useMutation } from "@tanstack/react-query"

import { api } from "@/lib/api"
import type {
	ShoppingTotalRequest,
	ShoppingTotalResponse,
} from "@/types/api.types"

export const useShopping = () => {
	const calculateTotalMutation = useMutation<
		ShoppingTotalResponse,
		Error,
		ShoppingTotalRequest
	>({
		mutationFn: async (payload) => {
			const { data } = await api.post<ShoppingTotalResponse>(
				"/shopping/total",
				payload
			)

			return data
		},
	})

	return {
		calculateTotalMutation,
	}
}
