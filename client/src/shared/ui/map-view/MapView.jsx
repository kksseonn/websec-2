import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { createClusterCustomIcon } from '@/shared/lib'
import { SettlementMarkers } from '@/shared/ui/map-settlements-markers'
import { MapZoomControls } from '@/shared/ui/map-zoom-controls'

const DEFAULT_CENTER = [61.524, 105.3188]
const DEFAULT_ZOOM = 3
const SELECTED_ZOOM = 9

function MapCenterController({
	selectedSettlement,
	markerRefs,
	clusterGroupRef
}) {
	const map = useMap()

	useEffect(() => {
		if (!selectedSettlement) {
			return
		}

		map.setView(
			[selectedSettlement.lat, selectedSettlement.lon],
			SELECTED_ZOOM,
			{ animate: true }
		)

		const timeoutId = setTimeout(() => {
			const marker = markerRefs.current[selectedSettlement.id]

			if (!marker) {
				return
			}

			const clusterGroup = clusterGroupRef.current

			if (clusterGroup?.zoomToShowLayer) {
				clusterGroup.zoomToShowLayer(marker, () => {
					const currentMarker = markerRefs.current[selectedSettlement.id]

					if (currentMarker) {
						currentMarker.openPopup()
					}
				})
				return
			}

			marker.openPopup()
		}, 350)

		return () => clearTimeout(timeoutId)
	}, [map, markerRefs, clusterGroupRef, selectedSettlement])

	return null
}

function MapZoomController() {
	const map = useMap()

	return (
		<div className="absolute top-1/2 right-4 z-1000 -translate-y-1/2">
			<MapZoomControls
				onZoomIn={() => map.zoomIn()}
				onZoomOut={() => map.zoomOut()}
			/>
		</div>
	)
}

export function MapView({
	settlements,
	selectedSettlement,
	onSelectSettlement
}) {
	const markerRefs = useRef({})
	const clusterGroupRef = useRef(null)

	return (
		<div className="relative">
			<div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
				<MapContainer
					center={DEFAULT_CENTER}
					zoom={DEFAULT_ZOOM}
					zoomControl={false}
					className="h-105 w-full"
				>
					<TileLayer
						attribution="&copy; OpenStreetMap contributors"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<MapCenterController
						selectedSettlement={selectedSettlement}
						markerRefs={markerRefs}
						clusterGroupRef={clusterGroupRef}
					/>

					<MapZoomController />

					<MarkerClusterGroup
						ref={clusterGroupRef}
						chunkedLoading
						maxClusterRadius={50}
						showCoverageOnHover={false}
						iconCreateFunction={createClusterCustomIcon}
					>
						<SettlementMarkers
							settlements={settlements}
							selectedSettlement={selectedSettlement}
							onSelectSettlement={onSelectSettlement}
							markerRefs={markerRefs}
						/>
					</MarkerClusterGroup>
				</MapContainer>
			</div>
		</div>
	)
}
