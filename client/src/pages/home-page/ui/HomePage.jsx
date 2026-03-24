import { useState } from 'react'
import { ForecastWidget } from '@/widgets/forecast'
import { SearchWidget } from '@/widgets/search'

export function HomePage() {
	const [selectedSettlement, setSelectedSettlement] = useState(null)

	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
			<h1 className="text-left text-2xl font-semibold">Прогноз погоды</h1>

			<p className="text-left">
				Выберите населённый пункт на карте или используйте поиск
			</p>

			<SearchWidget onSelect={setSelectedSettlement} />

			<div className="flex h-100 items-center justify-center rounded-2xl border">
				<span className="text-blue-500">карта</span>
			</div>

			<div>
				{selectedSettlement && (
					<div className="text-left">
						Выбранный город: <strong>{selectedSettlement.name}</strong>
					</div>
				)}
				<ForecastWidget selectedSettlement={selectedSettlement} />
			</div>
		</div>
	)
}
