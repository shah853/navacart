import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/prdocutservice';
import ProductCard from '../components/ProductCard';

function Productlisting() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // URL se category lena
  const categoryFromURL = searchParams.get('category') || 'all';

  const [category, setCategory] = useState(categoryFromURL);

  // URL category change hone par state update
  useEffect(() => {
    setCategory(categoryFromURL);
  }, [categoryFromURL]);

  // Products fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categories
  const categories = [
    'all',
    ...new Set(products.map((product) => product.category)),
  ];

  // Search + Category Filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'all' || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-10">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {category === 'all' ? 'All Products' : `${category} Products`}
          </h1>

          <p className="mt-2 text-slate-500">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Search + Category */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-80"
          />

          {/* Category Select */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 sm:w-52"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-slate-500">
            Loading products...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {/* No Products */}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-slate-500">
            No products found.
          </p>
        )}

        {/* Products */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default Productlisting;