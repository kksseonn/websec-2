import { Cloud, CloudRain, Sun } from 'lucide-react'

export function getWeatherIcon(day) {
	if (day.totalPrecip >= 1) {
		return CloudRain
	}

	if (day.totalPrecip > 0) {
		return Cloud
	}

	return Sun
}
