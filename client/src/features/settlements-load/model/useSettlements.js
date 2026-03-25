import { useEffect, useState } from 'react'
import { getSettlements } from '@/shared/api'

export function useSettlements() {
	const [settlements, setSettlements] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		let isCancelled = false

		async function loadSettlements() {
			try {
				setIsLoading(true)
				setError('')

				const data = await getSettlements()

				if (!isCancelled) {
					setSettlements(data)
				}
			} catch {
				if (!isCancelled) {
					setError('Не удалось загрузить населённые пункты')
					setSettlements([])
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false)
				}
			}
		}

		loadSettlements()

		return () => {
			isCancelled = true
		}
	}, [])

	return {
		settlements,
		isLoading,
		error
	}
}
