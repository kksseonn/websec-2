import { useForecast } from '@/features/forecast-load'
import { ForecastDayCard } from '@/shared/ui/forecast-day-card'

export function ForecastWidget({ selectedSettlement }) {
	const { forecast, isLoading, error } = useForecast(selectedSettlement)

	if (!selectedSettlement) {
		return (
			<div className="pt-4 text-sm text-slate-500">
				Выберите населённый пункт, чтобы увидеть прогноз
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="pt-4 text-sm text-slate-500">Загрузка прогноза...</div>
		)
	}

	if (error) {
		return <div className="pt-4 text-sm text-red-500">{error}</div>
	}

	return (
		<section className="mx-auto pt-6">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{forecast.map((day) => (
					<ForecastDayCard key={day.dateKey} day={day} />
				))}
			</div>
		</section>
	)
}
