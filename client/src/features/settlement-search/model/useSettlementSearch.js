import { useCallback, useEffect, useRef, useState } from 'react'
import { searchSettlements } from '@/shared/api'

export function useSettlementSearch() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const containerRef = useRef(null)
	const skipNextSearchRef = useRef(false)
	const requestIdRef = useRef(0)

	useEffect(() => {
		function handleClickOutside(event) {
			if (!containerRef.current?.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

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

		let isCancelled = false
		const currentRequestId = ++requestIdRef.current

		const timeoutId = setTimeout(async () => {
			try {
				setIsLoading(true)
				setError('')

				const data = await searchSettlements(trimmedQuery)

				if (isCancelled || currentRequestId !== requestIdRef.current) {
					return
				}

				setResults(data)
			} catch {
				if (isCancelled || currentRequestId !== requestIdRef.current) {
					return
				}

				setError('Не удалось выполнить поиск')
				setResults([])
			} finally {
				if (isCancelled || currentRequestId !== requestIdRef.current) {
					return
				}

				setIsLoading(false)
			}
		}, 300)

		return () => {
			isCancelled = true
			clearTimeout(timeoutId)
		}
	}, [query])

	const clearSearch = useCallback(() => {
		skipNextSearchRef.current = false
		setQuery('')
		setResults([])
		setError('')
		setIsLoading(false)
		setIsOpen(false)
	}, [])

	function handleFocus() {
		if (query.trim()) {
			setIsOpen(true)
		}
	}

	function selectSettlement(item) {
		skipNextSearchRef.current = true
		setQuery(item.name)
		setIsOpen(false)
		setResults([])
		setError('')
		setIsLoading(false)
	}

	return {
		query,
		setQuery,
		results,
		isLoading,
		error,
		isOpen,
		containerRef,
		handleFocus,
		clearSearch,
		selectSettlement
	}
}
