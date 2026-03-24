import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Tooltip,
	Legend,
	Filler
)

export function ForecastDayChart({ day }) {
	const data = {
		labels: day.labels,
		datasets: [
			{
				type: 'bar',
				label: 'Осадки',
				data: day.precipitation,
				backgroundColor: 'rgba(59, 130, 246, 0.3)',
				borderRadius: 6,
				yAxisID: 'y1'
			},
			{
				type: 'line',
				label: 'Температура',
				data: day.temperature,
				borderColor: 'rgb(37, 99, 235)',
				backgroundColor: 'rgba(37, 99, 235, 0.12)',
				tension: 0.35,
				pointRadius: 0,
				borderWidth: 2,
				fill: true,
				yAxisID: 'y'
			},
			{
				type: 'line',
				label: 'Ветер',
				data: day.windSpeed,
				borderColor: 'rgb(148, 163, 184)',
				tension: 0.35,
				pointRadius: 0,
				borderWidth: 2,
				yAxisID: 'y2'
			}
		]
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				mode: 'index',
				intersect: false
			}
		},
		scales: {
			x: {
				grid: {
					display: false
				},
				ticks: {
					maxTicksLimit: 4,
					font: {
						size: 10
					}
				}
			},
			y: {
				display: false
			},
			y1: {
				display: false,
				position: 'right'
			},
			y2: {
				display: false,
				position: 'right'
			}
		}
	}

	return <Chart type="bar" data={data} options={options} />
}
