import { Minus, Plus } from 'lucide-react'

export function MapZoomControls({ onZoomIn, onZoomOut }) {
	return (
		<div className="flex flex-col gap-3">
			<button
				type="button"
				onClick={onZoomIn}
				className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
				aria-label="Приблизить карту"
			>
				<Plus size={20} />
			</button>

			<button
				type="button"
				onClick={onZoomOut}
				className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
				aria-label="Отдалить карту"
			>
				<Minus size={20} />
			</button>
		</div>
	)
}
