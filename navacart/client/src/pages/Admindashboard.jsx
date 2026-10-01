import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import OrdersAnalyticsChart from "../components/admin/OrdersAnalyticsChart";
import PaymentBadge from "../components/admin/PaymentBadge";
import StatsCard from "../components/admin/StatsCard";
import StatusBadge from "../components/admin/StatusBadge";
import { getDashboardStats } from "../services/adminService";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function Admindashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setStats(await getDashboardStats());
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const dashboardStats = stats || {};

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-teal-700">NavaCart / Admin</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Dashboard</h1>
        </div>
        <Link to="/admin/orders" className="text-sm font-semibold text-teal-800 hover:text-teal-950">View all orders</Link>
      </div>
      {error && <p role="alert" className="mb-5 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}
      {loading ? (
        <p className="py-10 text-center text-sm text-slate-500">Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard title="Total Revenue" value={currency.format(dashboardStats.totalRevenue || 0)} icon="$" color="green" />
            <StatsCard title="Total Orders" value={(dashboardStats.totalOrders || 0).toLocaleString()} icon="#" color="blue" />
            <StatsCard title="Total Products" value={(dashboardStats.totalProducts || 0).toLocaleString()} icon="P" color="amber" />
            <StatsCard title="Total Customers" value={(dashboardStats.totalCustomers || 0).toLocaleString()} icon="C" color="teal" />
          </div>
          <section className="mt-6 border border-slate-200 bg-white p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-900">Orders this week</h2>
              <p className="text-xs text-slate-500">Past 7 days</p>
            </div>
            <OrdersAnalyticsChart data={dashboardStats.weeklyOrders || []} />
          </section>
          <section className="mt-6 border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-5">
              <h2 className="text-base font-semibold text-slate-900">Recent orders</h2>
              <Link to="/admin/orders" className="text-sm font-medium text-teal-800 hover:text-teal-950">All orders</Link>
            </div>
            {dashboardStats.recentOrders?.length ? (
              <ul className="divide-y divide-slate-100">
                {dashboardStats.recentOrders.map((order) => (
                  <li key={order._id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900">#{order._id.slice(-8).toUpperCase()} <span className="font-normal text-slate-500">{order.user?.name || "Unknown customer"}</span></p>
                      <p className="mt-1 text-xs text-slate-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Date unavailable"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={order.status} />
                      <PaymentBadge paymentStatus={order.paymentStatus} />
                      <span className="min-w-20 text-right text-sm font-semibold text-slate-900">{currency.format(order.totalAmount || 0)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-8 text-center text-sm text-slate-500">No recent orders.</p>
            )}
          </section>
        </>
      )}
    </AdminLayout>
  );
}

export default Admindashboard;
