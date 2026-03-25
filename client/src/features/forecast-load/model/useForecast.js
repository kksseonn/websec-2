import { useEffect, useState } from 'react'
import { getForecast } from '@/shared/api'
import { groupForecastByDay } from './lib/groupForecastByDay'

export function useForecast(selectedSettlement) {
	const [forecast, setForecast] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const settlementLat = selectedSettlement?.lat
	const settlementLon = selectedSettlement?.lon

	useEffect(() => {
		if (settlementLat == null || settlementLon == null) {
			setForecast([])
			setError('')
			setIsLoading(false)
			return
		}

		let isCancelled = false

		async function loadForecast() {
			try {
				setIsLoading(true)
				setError('')

				const data = await getForecast(settlementLat, settlementLon)

				if (!isCancelled) {
					setForecast(groupForecastByDay(data.series))
				}
			} catch {
				if (!isCancelled) {
					setError('Не удалось загрузить прогноз')
					setForecast([])
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false)
				}
			}
		}

		loadForecast()

		return () => {
			isCancelled = true
		}
	}, [settlementLat, settlementLon])

	return {
		forecast,
		isLoading,
		error
	}
}
