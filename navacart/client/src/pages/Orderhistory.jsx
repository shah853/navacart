import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/orderservice';

function Orderhistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch {
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center py-20 text-slate-500">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">No orders yet</h1>
        <p className="text-slate-500 mb-6">You haven't placed any orders.</p>
        <Link
          to="/products"
          className="rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-slate-500">
                  Order #{order._id.slice(-8).toUpperCase()}
                </p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-700'
                      : order.status === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-slate-600 mb-1">
                {order.items?.length || 0} item(s)
              </p>
              <p className="text-sm text-slate-500 mb-2">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p className="font-bold text-slate-800">${order.totalAmount}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Orderhistory;