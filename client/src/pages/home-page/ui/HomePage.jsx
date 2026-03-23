import { useState } from 'react'
import { SearchWidget } from '@/widgets/search'

export function HomePage() {
	const [selectedSettlement, setSelectedSettlement] = useState(null)

	return (
		<div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
			<h1 className="text-left text-2xl font-semibold">Прогноз погоды</h1>

			<p className="text-left">
				Выберите населённый пункт на карте или используйте поиск
			</p>

			<SearchWidget onSelect={setSelectedSettlement} />

			<div className="flex h-100 items-center justify-center rounded-2xl border">
				<span className="text-blue-500">карта</span>
			</div>

			<div className="border-t pt-6">
				<h2 className="text-left text-xl text-blue-500">прогноз погоды</h2>

				{selectedSettlement && (
					<div className="mt-4 text-left text-sm">
						Выбранный город: <strong>{selectedSettlement.name}</strong>
					</div>
				)}
			</div>
		</div>
	)
}
