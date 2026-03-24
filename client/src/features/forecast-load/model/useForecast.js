import { useEffect, useState } from 'react'
import { getForecast } from '@/shared/api'

function getWeekdayLabel(dateString) {
	const date = new Date(dateString)

	return new Intl.DateTimeFormat('ru-RU', {
		weekday: 'long'
	}).format(date)
}

function getDateLabel(dateString) {
	const date = new Date(dateString)

	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit'
	}).format(date)
}

function capitalize(value) {
	if (!value) return ''
	return value.charAt(0).toUpperCase() + value.slice(1)
}

function getConditionLabel(day) {
	let main = ''
	const details = []

	if (day.totalPrecip === 0) {
		main = 'Ясно'
	} else {
		main = 'Облачно'
	}

	if (day.totalPrecip > 0 && day.totalPrecip < 0.5) {
		details.push('небольшие осадки')
	} else if (day.totalPrecip >= 0.5 && day.totalPrecip < 2) {
		details.push('осадки')
	} else if (day.totalPrecip >= 2) {
		details.push('сильный дождь')
	}

	if (day.avgWind > 6) {
		details.push('ветренно')
	} else if (day.avgWind > 3) {
		details.push('умеренный ветер')
	}

	return {
		main,
		details
	}
}

function getStepHours(timestamps, index) {
	const current = timestamps[index]
	const next = timestamps[index + 1]

	if (!current || !next) {
		return 1
	}

	const currentDate = new Date(current)
	const nextDate = new Date(next)

	const diffMs = nextDate - currentDate
	const diffHours = diffMs / (1000 * 60 * 60)

	return diffHours > 0 ? diffHours : 1
}

function groupForecastByDay(series) {
	if (!series?.timestamps?.length) {
		return []
	}

	const grouped = {}

	series.timestamps.forEach((timestamp, index) => {
		const dateKey = timestamp.slice(0, 10)
		const hourLabel = timestamp.slice(11, 16)
		const stepHours = getStepHours(series.timestamps, index)
		const precipRate = series.precipitation[index] ?? 0
		const precipAmount = precipRate * stepHours

		if (!grouped[dateKey]) {
			grouped[dateKey] = {
				dateKey,
				weekday: capitalize(getWeekdayLabel(timestamp)),
				dateLabel: getDateLabel(timestamp),
				labels: [],
				temperature: [],
				precipitation: [],
				windSpeed: [],
				weatherCondition: [],
				precipAmounts: []
			}
		}

		grouped[dateKey].labels.push(hourLabel)
		grouped[dateKey].temperature.push(series.temperature[index] ?? 0)
		grouped[dateKey].precipitation.push(precipRate)
		grouped[dateKey].windSpeed.push(series.windSpeed[index] ?? 0)
		grouped[dateKey].weatherCondition.push(
			series.weatherCondition?.[index] ?? null
		)
		grouped[dateKey].precipAmounts.push(precipAmount)
	})

	return Object.values(grouped)
		.slice(0, 7)
		.map((day) => {
			const minTemp = Math.min(...day.temperature)
			const maxTemp = Math.max(...day.temperature)

			const avgWind =
				day.windSpeed.reduce((sum, value) => sum + value, 0) /
				day.windSpeed.length

			const totalPrecip = day.precipAmounts.reduce(
				(sum, value) => sum + value,
				0
			)

			return {
				...day,
				minTemp,
				maxTemp,
				avgWind,
				totalPrecip,
				conditionLabel: getConditionLabel({
					totalPrecip,
					avgWind
				})
			}
		})
}

export function useForecast(selectedSettlement) {
	const [forecast, setForecast] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (!selectedSettlement) {
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

				const data = await getForecast(
					selectedSettlement.lat,
					selectedSettlement.lon
				)

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
	}, [selectedSettlement])

	return {
		forecast,
		isLoading,
		error
	}
}
