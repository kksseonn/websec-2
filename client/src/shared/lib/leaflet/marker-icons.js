import L from 'leaflet'

function createMarkerHtml(isSelected) {
	return `
    <div class="map-marker ${isSelected ? 'map-marker--selected' : ''}">
      <span class="map-marker__dot"></span>
    </div>
  `
}

export function createSettlementMarker(isSelected = false) {
	return L.divIcon({
		className: '',
		html: createMarkerHtml(isSelected),
		iconSize: isSelected ? [22, 22] : [18, 18],
		iconAnchor: isSelected ? [11, 11] : [9, 9],
		popupAnchor: [0, -10]
	})
}
