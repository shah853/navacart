import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { getAllProducts } from "../services/adminService";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function AdminProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadProducts = async () => {
			try {
				setProducts(await getAllProducts());
			} catch (requestError) {
				setError(requestError.response?.data?.message || "Failed to load products.");
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, []);

	return (
		<AdminLayout>
			<div className="mb-6">
				<p className="text-sm font-medium text-teal-700">NavaCart / Admin</p>
				<h1 className="mt-1 text-2xl font-semibold text-slate-900">Products</h1>
			</div>
			{error && <p role="alert" className="mb-4 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}
			{loading ? (
				<p className="py-10 text-center text-sm text-slate-500">Loading products...</p>
			) : products.length === 0 ? (
				<p className="py-10 text-center text-sm text-slate-500">No products found.</p>
			) : (
				<div className="overflow-x-auto rounded border border-slate-200 bg-white">
					<table className="w-full min-w-[620px] text-left text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500">
							<tr>
								<th className="px-4 py-3 font-semibold">Name</th>
								<th className="px-4 py-3 font-semibold">Price</th>
								<th className="px-4 py-3 font-semibold">Stock</th>
								<th className="px-4 py-3 font-semibold">Category</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{products.map((product) => (
								<tr key={product._id}>
									<td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
									<td className="px-4 py-3 text-slate-700">{currency.format(product.price || 0)}</td>
									<td className="px-4 py-3 text-slate-700">{product.stock ?? 0}</td>
									<td className="px-4 py-3 text-slate-700">{product.category || "—"}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</AdminLayout>
	);
}

export default AdminProducts;
