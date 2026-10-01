import PaymentBadge from "./PaymentBadge";
import StatusBadge from "./StatusBadge";
import StatusDropdown from "./StatusDropdown";

const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function OrdersTable({ orders = [], onStatusChange, onPaymentChange }) {
	if (!orders.length) {
		return <p className="py-10 text-center text-sm text-slate-500">No orders found.</p>;
	}

	return (
		<div className="overflow-x-auto rounded border border-slate-200 bg-white">
			<table className="w-full min-w-[900px] text-left text-sm">
				<thead className="bg-slate-50 text-xs uppercase text-slate-500">
					<tr>
						<th className="px-4 py-3 font-semibold">Order ID</th>
						<th className="px-4 py-3 font-semibold">Customer</th>
						<th className="px-4 py-3 font-semibold">Items</th>
						<th className="px-4 py-3 font-semibold">Total</th>
						<th className="px-4 py-3 font-semibold">Status</th>
						<th className="px-4 py-3 font-semibold">Payment</th>
						<th className="px-4 py-3 font-semibold">Date</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{orders.map((order) => (
						<tr key={order._id} className="align-middle text-slate-700">
							<td className="px-4 py-3 font-medium text-slate-900">#{order._id.slice(-8).toUpperCase()}</td>
							<td className="px-4 py-3">
								<div className="font-medium text-slate-900">{order.user?.name || "Unknown customer"}</div>
								<div className="text-xs text-slate-500">{order.user?.email || ""}</div>
							</td>
							<td className="px-4 py-3">{order.items?.reduce((total, item) => total + Number(item.quantity || 0), 0) || 0}</td>
							<td className="px-4 py-3">{currency.format(order.totalAmount || 0)}</td>
							<td className="px-4 py-3">
								<div className="flex flex-col items-start gap-2">
									<StatusBadge status={order.status} />
									<StatusDropdown
										currentStatus={order.status || "pending"}
										onChange={(status) => onStatusChange?.(order._id, status)}
									/>
								</div>
							</td>
							<td className="px-4 py-3">
								<div className="flex flex-col items-start gap-2">
									<PaymentBadge paymentStatus={order.paymentStatus} />
									<select
										aria-label="Change payment status"
										value={order.paymentStatus || "pending"}
										onChange={(event) => onPaymentChange?.(order._id, event.target.value)}
										className="rounded border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100"
									>
										<option value="pending">Pending</option>
										<option value="paid">Paid</option>
										<option value="failed">Failed</option>
									</select>
								</div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap">
								{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default OrdersTable;
