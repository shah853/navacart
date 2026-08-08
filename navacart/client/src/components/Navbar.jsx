import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { CartContext } from '../context/Cartcontext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount =
    cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${search}`);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-purple-600"
        >
          NavaCart
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          <Link to="/" className="transition hover:text-purple-600">
            Home
          </Link>

          <Link to="/products" className="transition hover:text-purple-600">
            Shop
          </Link>

          <Link to="/categories" className="transition hover:text-purple-600">
            Categories
          </Link>

          <Link to="/contact" className="transition hover:text-purple-600">
            Contact
          </Link>

          {user && (
            <Link to="/orders" className="transition hover:text-purple-600">
              My Orders
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin" className="transition hover:text-purple-600">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">

          <form onSubmit={handleSearch} className="hidden md:flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search..."
              className="rounded-full border border-slate-300 px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </form>

          {user ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline-block">
                👤 ~{user.name}
              </span>

              <button
                onClick={handleLogout}
                className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-purple-500 hover:text-purple-600 sm:inline-block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-purple-500 hover:text-purple-600 sm:inline-block"
            >
              👤 Login
            </Link>
          )}

          <Link
            to="/cart"
            className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            🛒 Cart ({cartCount})
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xl text-slate-700 lg:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">

          <nav className="flex flex-col gap-1 text-sm font-medium text-slate-700">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 hover:bg-purple-50 hover:text-purple-600"
            >
              🏠 Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 hover:bg-purple-50 hover:text-purple-600"
            >
              🛍️ Shop
            </Link>

            <Link
              to="/categories"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 hover:bg-purple-50 hover:text-purple-600"
            >
              📂 Categories
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 hover:bg-purple-50 hover:text-purple-600"
            >
              📞 Contact
            </Link>

            {user && (
              <Link
                to="/orders"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 hover:bg-purple-50 hover:text-purple-600"
              >
                📦 My Orders
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 hover:bg-purple-50 hover:text-purple-600"
              >
                ⚙️ Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-2 rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 rounded-lg px-4 py-3 hover:bg-purple-50 hover:text-purple-600"
              >
                👤 Login
              </Link>
            )}

          </nav>

          <form onSubmit={handleSearch} className="mt-4 md:hidden">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search products..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </form>

        </div>
      )}
    </header>
  );
}

export default Navbar;