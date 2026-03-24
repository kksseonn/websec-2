import { Search } from 'lucide-react'
import { useSettlementSearch } from '@/features/settlement-search'

export function SearchWidget({ onSelect }) {
	const {
		query,
		setQuery,
		results,
		isLoading,
		error,
		isOpen,
		selectSettlement
	} = useSettlementSearch()

	function handleSelect(item) {
		onSelect?.(item)
		selectSettlement(item)
	}

	return (
		<div className="flex justify-end">
			<div className="relative w-full max-w-sm">
				<div className="flex h-11 items-center rounded-full border border-slate-300 bg-white px-4 shadow-sm">
					<input
						type="text"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Поиск населённого пункта"
						className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
					/>

					<Search className="h-4 w-4 text-slate-400" />
				</div>

				{isOpen && (
					<div className="absolute right-0 z-20 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
						{isLoading && (
							<div className="px-3 py-2 text-sm text-slate-500">Поиск...</div>
						)}

						{error && !isLoading && (
							<div className="px-3 py-2 text-sm text-red-500">{error}</div>
						)}

						{!isLoading && !error && results.length === 0 && query.trim() && (
							<div className="px-3 py-2 text-sm text-slate-500">
								Ничего не найдено
							</div>
						)}

						{!isLoading &&
							!error &&
							results.map((item) => (
								<button
									key={item.id}
									type="button"
									onClick={() => handleSelect(item)}
									className="block w-full rounded-xl px-3 py-2 text-left transition hover:bg-slate-100"
								>
									<div className="text-sm font-medium text-slate-900">
										{item.name}
									</div>
									<div className="text-xs text-slate-500">{item.region}</div>
								</button>
							))}
					</div>
				)}
			</div>
		</div>
	)
}
