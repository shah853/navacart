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

  const categories = ['Men', 'Women', 'Kids', 'Shoes', 'Watches'];

  return (
    <div className="w-full">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <section className="flex min-h-[40vh] items-center rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-500 to-indigo-600 p-6 text-white shadow-xl sm:p-8 lg:p-12">

          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">

            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-100">
                Fresh picks for every day
              </p>

              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Shop smarter with NavaCart.
              </h1>

              <p className="mt-4 text-base text-purple-100 sm:text-lg">
                Discover trendy products, fast checkout, and a smooth shopping
                experience from one place.
              </p>

              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-block rounded-full bg-white px-5 py-3 text-sm font-semibold text-purple-700 shadow-md transition hover:bg-purple-50"
                >
                  Start Shopping
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-6">
                <div className="rounded-xl bg-white p-5 text-slate-800 shadow-sm sm:p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    Featured Deal
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                    Up to 40% off selected items
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    Browse top-rated products and save on your favorites this week.
                  </p>

                  <Link
                    to="/products?deal=featured"
                    className="mt-5 inline-block rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-purple-700"
                  >
                    View Deals
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {loading && (
          <p className="py-8 text-center text-slate-500">
            Loading products...
          </p>
        )}

        {error && (
          <p className="py-8 text-center text-red-500">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          categories.map((category) => {
            const categoryProducts = products
              .filter(
                (p) =>
                  p.category?.toLowerCase() === category.toLowerCase()
              )
              .slice(0, 3);

            if (categoryProducts.length === 0) return null;

            return (
              <section key={category} className="mt-10">

                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {category}
                  </h2>

                  <Link
                    to={`/products?category=${category}`}
                    className="text-sm font-medium text-purple-600 hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                    />
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