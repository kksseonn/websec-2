import { apiClient } from '@/shared/lib'

export async function getSettlements() {
	const response = await apiClient.get('/settlements')
	return response.data
}

export async function searchSettlements(query) {
	const response = await apiClient.get('/settlements/search', {
		params: { q: query }
	})

	return response.data
}
