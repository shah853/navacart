const statusStyles = {
	pending: "bg-amber-100 text-amber-800",
	processing: "bg-sky-100 text-sky-800",
	shipped: "bg-violet-100 text-violet-800",
	delivered: "bg-emerald-100 text-emerald-800",
	cancelled: "bg-rose-100 text-rose-800",
};

function StatusBadge({ status = "pending" }) {
	const normalizedStatus = String(status).toLowerCase();

	return (
		<span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[normalizedStatus] || "bg-slate-100 text-slate-700"}`}>
			{normalizedStatus}
		</span>
	);
}

export default StatusBadge;
