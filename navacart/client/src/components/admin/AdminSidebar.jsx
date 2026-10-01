import { NavLink } from "react-router-dom";

const links = [
	{ label: "Dashboard", to: "/admin" },
	{ label: "Orders", to: "/admin/orders" },
	{ label: "Products", to: "/admin/products" },
	{ label: "Customers", to: "/admin/customers" },
	{ label: "Settings", to: "/admin/settings" },
];

function AdminSidebar({ onNavigate }) {
	return (
		<aside className="flex h-full w-[180px] shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-5">
			<p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">NavaCart</p>
			<nav aria-label="Admin navigation" className="mt-5 flex flex-col gap-1">
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						end={link.to === "/admin"}
						onClick={onNavigate}
						className={({ isActive }) => `rounded px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
					>
						{link.label}
					</NavLink>
				))}
			</nav>
		</aside>
	);
}

export default AdminSidebar;
