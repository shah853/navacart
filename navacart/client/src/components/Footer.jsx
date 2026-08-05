import { Link } from "react-router-dom";
function Footer(){
  return(
    <footer  className="border-t border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-10 py-10 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
                <div >
                    <h2 className="text-2xl font-bold text-purple-25">
                        NavaCart
                    </h2>
                     <p className="mt-3 text-sm leading-6 text-slate-300">
              Your one-stop online shopping destination. Shop quality
              products with secure payments and fast delivery.
            </p>
                </div>
                <div>
                    <h3 className="mb-3 text-lg font-semibold">Qucik Links</h3>
                    <ul className="pace-y-2 text-slate-300">
                        <li>
                            <Link to="/"className="transition hover:text-purple-300">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="transition hover:text-purple-300 ">Shop</Link>

                            </li>
                            <li>
                                <Link to="/cart" className="transition hover:text-purple-300">Cart</Link>

                            </li>
                            <li>
                                <Link to="/login" className="transition hover:text-purple-300">Login</Link>
                            </li>
                    </ul>
                </div>
                <div >
                    <h3 className="mb-3 text-slate-lg font-semibold">Contact</h3>
                    <p className="text-slate-300">Email: m.shahafridi777@gmail.com</p>
                    <p className="mt-2 text-slate-300">Phone: +92 3092777611</p>
                    <p className="mt-2 text-slate-300">Peshawar ,pakistan</p>
                </div>
            </div>

              <div className="mt-8 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} NavaCart. All Rights Reserved.
        </div>
      </div>

    </footer>
  );
}
export default Footer;