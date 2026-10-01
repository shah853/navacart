const paymentStyles = {
	pending: "bg-amber-100 text-amber-800",
	paid: "bg-emerald-100 text-emerald-800",
	failed: "bg-rose-100 text-rose-800",
};

function PaymentBadge({ paymentStatus = "pending" }) {
	const normalizedStatus = String(paymentStatus).toLowerCase();

	return (
		<span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${paymentStyles[normalizedStatus] || "bg-slate-100 text-slate-700"}`}>
			{normalizedStatus}
		</span>
	);
}

export default PaymentBadge;
