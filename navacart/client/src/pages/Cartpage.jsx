import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/Cartcontext';
import { AuthContext } from '../context/Authcontext';

function Cartpage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
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
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{item.name}</h3>
                  <p className="text-sm text-slate-500">${item.price}</p>
                </div>

                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-1.5 text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                <p className="w-20 text-right font-semibold text-slate-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-slate-500 hover:text-red-500 font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600 mb-4">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-slate-800">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-lg bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cartpage;