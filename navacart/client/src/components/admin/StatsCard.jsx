const colorStyles = {
	teal: "bg-teal-50 text-teal-800",
	blue: "bg-sky-50 text-sky-800",
	green: "bg-emerald-50 text-emerald-800",
	amber: "bg-amber-50 text-amber-800",
};

function StatsCard({ title, value, icon, color = "teal" }) {
	return (
		<section className="min-w-0 border-l-4 border-teal-600 bg-white px-5 py-4 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="text-sm font-medium text-slate-500">{title}</p>
					<p className="mt-2 truncate text-2xl font-semibold text-slate-900">{value}</p>
				</div>
				{icon && (
					<span className={`grid h-10 w-10 shrink-0 place-items-center rounded ${colorStyles[color] || colorStyles.teal}`} aria-hidden="true">
						{icon}
					</span>
				)}
			</div>
		</section>
	);
}

export default StatsCard;
