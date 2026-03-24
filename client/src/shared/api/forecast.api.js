import { apiClient } from '@/shared/lib'

export async function getForecast(lat, lon) {
	const response = await apiClient.get('/forecast', {
		params: { lat, lon }
	})

	return response.data
}
