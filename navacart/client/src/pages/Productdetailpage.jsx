import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/prdocutservice';
import { CartContext } from '../context/Cartcontext';

function Productdetailpage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return <p className="text-center py-20 text-slate-500">Loading product...</p>;
  }

  if (error || !product) {
    return <p className="text-center py-20 text-red-500">{error || 'Product not found.'}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <Link to="/products" className="text-sm text-purple-600 hover:underline mb-6 inline-block">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
            <img
              src={product.image || 'https://via.placeholder.com/500'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-purple-600 uppercase tracking-wide">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-800">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-slate-900">${product.price}</p>
            <p className="mt-4 text-slate-600 leading-relaxed">{product.description}</p>

            <p className="mt-4 text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition disabled:bg-slate-300"
              >
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Productdetailpage;