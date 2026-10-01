function OrdersAnalyticsChart({ data = [] }) {
	const width = 720;
	const height = 250;
	const left = 38;
	const right = 16;
	const top = 18;
	const bottom = 42;
	const plotWidth = width - left - right;
	const plotHeight = height - top - bottom;
	const maximum = Math.max(1, ...data.map((day) => Number(day.orders) || 0));
	const points = data.map((day, index) => ({
		x: data.length > 1 ? left + (index * plotWidth) / (data.length - 1) : left + plotWidth / 2,
		y: top + plotHeight - ((Number(day.orders) || 0) / maximum) * plotHeight,
	}));
	const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");

	return (
		<div className="w-full overflow-hidden">
			<svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Orders by day for the past week" className="h-auto w-full">
				{[0, 0.5, 1].map((fraction) => {
					const y = top + plotHeight * fraction;
					const value = Math.round(maximum * (1 - fraction));
					return (
						<g key={fraction}>
							<line x1={left} x2={width - right} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 5" />
							<text x={left - 10} y={y + 4} textAnchor="end" fill="#64748b" fontSize="11">{value}</text>
						</g>
					);
				})}
				{points.length > 0 && <path d={line} fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
				{points.map((point, index) => (
					<g key={`${data[index].label}-${index}`}>
						<circle cx={point.x} cy={point.y} r="4" fill="#fff" stroke="#0f766e" strokeWidth="3" />
						<text x={point.x} y={height - 12} textAnchor="middle" fill="#64748b" fontSize="11">{data[index].label}</text>
					</g>
				))}
			</svg>
		</div>
	);
}

export default OrdersAnalyticsChart;
