import { useSettlements } from '@/features/settlements-load'
import { MapView } from '@/shared/ui/map-view'

export function MapWidget({ selectedSettlement, onSelectSettlement }) {
	const { settlements, isLoading, error } = useSettlements()

	if (isLoading) {
		return (
			<section className="space-y-3">
				<div className="text-sm text-slate-500">Загрузка карты...</div>
			</section>
		)
	}

	if (error) {
		return (
			<section className="space-y-3">
				<div className="text-sm text-red-500">{error}</div>
			</section>
		)
	}

	if (!settlements.length) {
		return (
			<section className="space-y-3">
				<div className="text-sm text-slate-500">
					Населённые пункты не найдены
				</div>
			</section>
		)
	}

	return (
		<section className="space-y-3">
			<MapView
				settlements={settlements}
				selectedSettlement={selectedSettlement}
				onSelectSettlement={onSelectSettlement}
			/>
		</section>
	)
}
