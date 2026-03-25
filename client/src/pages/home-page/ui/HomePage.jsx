import { useState } from 'react'
import { ForecastWidget } from '@/widgets/forecast'
import { MapWidget } from '@/widgets/map'
import { SearchWidget } from '@/widgets/search'

export function HomePage() {
	const [selectedSettlement, setSelectedSettlement] = useState(null)
	const [selectionSource, setSelectionSource] = useState(null)

	function handleSelectFromSearch(settlement) {
		setSelectedSettlement(settlement)
		setSelectionSource('search')
	}

	function handleSelectFromMap(settlement) {
		setSelectedSettlement(settlement)
		setSelectionSource('map')
	}

	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
			<h1 className="text-left text-2xl font-semibold">Прогноз погоды</h1>

			<p className="text-left">
				Выберите населённый пункт на карте или используйте поиск
			</p>

			<SearchWidget
				onSelect={handleSelectFromSearch}
				selectedSettlement={selectedSettlement}
				selectionSource={selectionSource}
			/>

			<MapWidget
				selectedSettlement={selectedSettlement}
				onSelectSettlement={handleSelectFromMap}
			/>

			{selectedSettlement && (
				<div className="text-sm text-slate-600">
					Выбранный город:{' '}
					<span className="font-semibold">{selectedSettlement.name}</span>
				</div>
			)}

			<ForecastWidget selectedSettlement={selectedSettlement} />
		</div>
	)
}
