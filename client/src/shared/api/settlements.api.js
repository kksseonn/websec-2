import { apiClient } from '../lib'

export async function searchSettlements(query) {
	const response = await apiClient.get('/settlements/search', {
		params: { q: query }
	})

	return response.data
}
