import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Homepage from "./pages/Homepage";
import Productlisting from "./pages/Productlisting";
import Productdetailpage from "./pages/Productdetailpage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import Orderhistory from "./pages/Orderhistory";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Admindashboard from "./pages/Admindashboard";
import Categoriespage from './pages/Categoriespage';
import Contactpage from './pages/Contactpage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Productlisting />} />
          <Route path="/products/:id" element={<Productdetailpage />} />
          <Route path="/categories" element={<Categoriespage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/contact" element={<Contactpage />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkoutpage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orderhistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admindashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;