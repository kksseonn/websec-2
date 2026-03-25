import { Marker, Popup, Tooltip } from 'react-leaflet'
import { createSettlementMarker } from '@/shared/lib'

export function SettlementMarkers({
	settlements,
	selectedSettlement,
	onSelectSettlement,
	markerRefs
}) {
	return settlements.map((item) => {
		const isSelected = selectedSettlement?.id === item.id

		return (
			<Marker
				key={item.id}
				position={[item.lat, item.lon]}
				icon={createSettlementMarker(isSelected)}
				ref={(instance) => {
					if (instance) {
						markerRefs.current[item.id] = instance
					} else {
						delete markerRefs.current[item.id]
					}
				}}
				eventHandlers={{
					click: () => onSelectSettlement?.(item)
				}}
			>
				<Tooltip
					permanent={isSelected}
					direction="top"
					offset={[0, -12]}
					opacity={1}
					className="map-tooltip"
				>
					{item.name}
				</Tooltip>

				<Popup className="map-popup" closeButton={false} autoPan={false}>
					<div className="min-w-52.5 rounded-2xl">
						<div className="text-base font-semibold text-slate-900">
							{item.name}
						</div>

						<div className="mt-1 text-sm text-slate-500">{item.region}</div>

						<div className="mt-3 rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
							Население:{' '}
							<span className="font-medium text-slate-900">
								{item.population.toLocaleString('ru-RU')}
							</span>
						</div>
					</div>
				</Popup>
			</Marker>
		)
	})
}
