import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className="flex min-h-screen bg-slate-50">
			<div className="sticky top-0 hidden h-screen md:block">
				<AdminSidebar />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center border-b border-slate-200 bg-white px-4 py-3 md:hidden">
					<button
						type="button"
						aria-label="Open admin navigation"
						aria-expanded={drawerOpen}
						onClick={() => setDrawerOpen(true)}
						className="grid h-10 w-10 place-items-center rounded border border-slate-200 text-xl text-slate-700"
					>
						☰
					</button>
					<span className="ml-3 text-sm font-semibold text-slate-800">Admin panel</span>
				</div>
				<main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
			</div>
			{drawerOpen && (
				<div className="fixed inset-0 z-50 flex md:hidden">
					<button
						type="button"
						aria-label="Close admin navigation"
						onClick={() => setDrawerOpen(false)}
						className="absolute inset-0 bg-slate-950/40"
					/>
					<div className="relative h-full shadow-xl">
						<AdminSidebar onNavigate={() => setDrawerOpen(false)} />
						<button
							type="button"
							aria-label="Close admin navigation"
							onClick={() => setDrawerOpen(false)}
							className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded text-lg text-slate-600"
						>
							×
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminLayout;
