import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { getAllCustomers } from "../services/adminService";

function AdminCustomers() {
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadCustomers = async () => {
			try {
				setCustomers(await getAllCustomers());
			} catch (requestError) {
				setError(requestError.response?.data?.message || "Failed to load customers.");
			} finally {
				setLoading(false);
			}
		};

		loadCustomers();
	}, []);

	return (
		<AdminLayout>
			<div className="mb-6">
				<p className="text-sm font-medium text-teal-700">NavaCart / Admin</p>
				<h1 className="mt-1 text-2xl font-semibold text-slate-900">Customers</h1>
			</div>
			{error && <p role="alert" className="mb-4 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}
			{loading ? (
				<p className="py-10 text-center text-sm text-slate-500">Loading customers...</p>
			) : customers.length === 0 ? (
				<p className="py-10 text-center text-sm text-slate-500">No customers found.</p>
			) : (
				<div className="overflow-x-auto rounded border border-slate-200 bg-white">
					<table className="w-full min-w-[620px] text-left text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500">
							<tr>
								<th className="px-4 py-3 font-semibold">Name</th>
								<th className="px-4 py-3 font-semibold">Email</th>
								<th className="px-4 py-3 font-semibold">Joined</th>
								<th className="px-4 py-3 font-semibold">Orders</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{customers.map((customer) => (
								<tr key={customer._id}>
									<td className="px-4 py-3 font-medium text-slate-900">{customer.name}</td>
									<td className="px-4 py-3 text-slate-700">{customer.email}</td>
									<td className="px-4 py-3 text-slate-700">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : "—"}</td>
									<td className="px-4 py-3 text-slate-700">{customer.totalOrders ?? 0}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</AdminLayout>
	);
}

export default AdminCustomers;
