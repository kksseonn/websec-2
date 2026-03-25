import L from 'leaflet'

export function createClusterCustomIcon(cluster) {
	const count = cluster.getChildCount()

	let sizeClass = 'map-cluster--small'

	if (count >= 100) {
		sizeClass = 'map-cluster--large'
	} else if (count >= 20) {
		sizeClass = 'map-cluster--medium'
	}

	return L.divIcon({
		html: `
      <div class="map-cluster ${sizeClass}">
        <span>${count}</span>
      </div>
    `,
		className: '',
		iconSize: [44, 44]
	})
}
