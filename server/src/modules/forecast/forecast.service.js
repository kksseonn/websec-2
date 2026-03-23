import axios from 'axios'

import { config } from '../../app/config.js'
import { HttpError } from '../../shared/errors/http-error.js'
import { mapForecastResponse } from './forecast.mapper.js'

function formatDate(date) {
	return date.toISOString().slice(0, 10)
}

function getDateRange() {
	const start = new Date()
	const end = new Date()

	end.setDate(end.getDate() + 7)

	return `${formatDate(start)},${formatDate(end)}`
}

export async function getForecastByCoords(lat, lon) {
	if (!lat || !lon) {
		throw new HttpError(400, 'lat and lon are required')
	}

	const parsedLat = Number(lat)
	const parsedLon = Number(lon)

	if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLon)) {
		throw new HttpError(400, 'lat and lon must be valid numbers')
	}

	if (parsedLat < -90 || parsedLat > 90) {
		throw new HttpError(400, 'lat must be between -90 and 90')
	}

	if (parsedLon < -180 || parsedLon > 180) {
		throw new HttpError(400, 'lon must be between -180 and 180')
	}

	if (!config.eolApiToken) {
		throw new HttpError(500, 'EOL_API_TOKEN is not configured')
	}

	const dateRange = getDateRange()

	try {
		const response = await axios.get('https://projecteol.ru/api/weather/', {
			params: {
				lat: parsedLat,
				lon: parsedLon,
				date: dateRange,
				token: config.eolApiToken
			},
			timeout: 15000
		})

		const data = response.data

		if (!Array.isArray(data) || data.length === 0) {
			throw new HttpError(502, 'Weather API returned empty data')
		}

		return mapForecastResponse(data, parsedLat, parsedLon)
	} catch (error) {
		if (error instanceof HttpError) {
			throw error
		}

		if (error.response) {
			throw new HttpError(
				error.response.status || 502,
				error.response.data?.message || 'Weather API request failed'
			)
		}

		throw new HttpError(502, 'Failed to fetch forecast data')
	}
}