const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

function StatusDropdown({ currentStatus = "pending", onChange }) {
	return (
		<select
			aria-label="Change order status"
			value={currentStatus}
			onChange={(event) => onChange?.(event.target.value)}
			className="rounded border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100"
		>
			{statuses.map((status) => (
				<option key={status} value={status}>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</option>
			))}
		</select>
	);
}

export default StatusDropdown;
