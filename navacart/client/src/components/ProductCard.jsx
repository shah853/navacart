import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/Cartcontext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="mt-1 text-base font-semibold text-slate-800 truncate">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            Pkr {product.price}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="rounded-full bg-purple-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-purple-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;