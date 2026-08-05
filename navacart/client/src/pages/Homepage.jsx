import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/prdocutservice';
import ProductCard from '../components/ProductCard';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["Men", "Women", "Kids", "Shoes", "Watches"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-24">
        
        {/* Hero Section */}
        <section className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-500 to-indigo-600 p-8 text-white shadow-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-100">
              Fresh picks for every day
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Shop smarter with NavaCart.
            </h1>
            <p className="mt-4 text-lg text-purple-100">
              Discover trendy products, fast checkout, and a smooth shopping experience from one place.
            </p>
            <div className="mt-8">
              <Link
                to="/products"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-md hover:bg-purple-50 transition"
              >
                Start Shopping
              </Link>
            </div>
          </div>

          {/* Right Side Card (Added Box) */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/20 shadow-2xl">
              <div className="rounded-xl bg-white p-6 text-slate-800 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Featured Deal
                </span>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Up to 40% off selected items
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Browse top-rated products and save on your favorites this week.
                </p>
                <Link
                  to="/products?deal=featured"
                  className="mt-5 inline-block rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-700 transition"
                >
                  View Deals
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* Loading / Error States */}
        {loading && <p className="text-slate-500 text-center py-6">Loading products...</p>}
        {error && <p className="text-red-500 text-center py-6">{error}</p>}

        {/* Categories Section */}
        {!loading && categories.map((category) => {
          const categoryProducts = products
            .filter((p) => p.category?.toLowerCase() === category.toLowerCase())
            .slice(0, 3);

          if (categoryProducts.length === 0) return null;

          return (
            <section key={category}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Link
                  to={`/products?category=${category}`}
                  className="text-sm font-medium text-purple-600 hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}

      </main>
    </div>
  );
}

export default Homepage;