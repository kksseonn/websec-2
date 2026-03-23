import { useEffect, useRef, useState } from 'react'
import { searchSettlements } from '@/shared/api'

export function useSettlementSearch() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const skipNextSearchRef = useRef(false)

	useEffect(() => {
		const trimmedQuery = query.trim()

		if (skipNextSearchRef.current) {
			skipNextSearchRef.current = false
			return
		}

		if (!trimmedQuery) {
			setResults([])
			setError('')
			setIsLoading(false)
			setIsOpen(false)
			return
		}

		setIsOpen(true)

		const timeoutId = setTimeout(async () => {
			try {
				setIsLoading(true)
				setError('')

				const data = await searchSettlements(trimmedQuery)
				setResults(data)
			} catch {
				setError('Не удалось выполнить поиск')
				setResults([])
			} finally {
				setIsLoading(false)
			}
		}, 300)

		return () => clearTimeout(timeoutId)
	}, [query])

	function closeResults() {
		setIsOpen(false)
		setResults([])
		setError('')
		setIsLoading(false)
	}

	function selectSettlement(item) {
		skipNextSearchRef.current = true
		setQuery(item.name)
		closeResults()
	}

	return {
		query,
		setQuery,
		results,
		isLoading,
		error,
		isOpen,
		closeResults,
		selectSettlement
	}
}
