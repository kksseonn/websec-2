import { Wind } from 'lucide-react'
import { getWeatherIcon } from '@/shared/lib'
import { ForecastDayChart } from '@/shared/ui/forecast-day-chart'

export function ForecastDayCard({ day }) {
	const WeatherIcon = getWeatherIcon(day)
	const conditionMain = day.conditionLabel?.main || ''
	const conditionDetails = day.conditionLabel?.details || []

	return (
		<article className="flex flex-col rounded-2xl border border-slate-300 bg-white p-4 shadow-sm">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-blue-600">{day.weekday}</h3>

				<div className="text-sm font-semibold text-slate-500">
					{day.dateLabel}
				</div>
			</div>

			<div className="mb-4 flex items-center gap-3">
				<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300 bg-blue-50">
					<WeatherIcon className="h-7 w-7 text-blue-600" />
				</div>

				<div className="text-sm leading-5">
					<div className="font-medium text-slate-800">{conditionMain}</div>

					{conditionDetails.length > 0 && (
						<div className="text-xs text-slate-500">
							{conditionDetails.join(', ')}
						</div>
					)}
				</div>
			</div>

			<div className="mb-4 h-28">
				<ForecastDayChart day={day} />
			</div>

			<div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
				<div className="rounded-2xl bg-slate-50 p-3">
					<div className="text-xs text-slate-400">Температура</div>
					<div className="mt-1 font-medium text-slate-900">
						{Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
					</div>
				</div>

				<div className="rounded-2xl bg-slate-50 p-3">
					<div className="flex items-center gap-1 text-xs text-slate-400">
						<Wind className="h-3.5 w-3.5" />
						Ветер
					</div>
					<div className="mt-1 font-medium text-slate-900">
						{day.avgWind.toFixed(1)} м/с
					</div>
				</div>

				<div className="col-span-2 rounded-2xl bg-slate-50 p-3">
					<div className="text-xs text-slate-400">Осадки за день</div>
					<div className="mt-1 font-medium text-slate-900">
						{day.totalPrecip.toFixed(2)} мм
					</div>
				</div>
			</div>
		</article>
	)
}
