import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import ProductNew from "./pages/Products/ProductNew";
import Sales from "./pages/Sales/Sales";
import Customers from "./pages/Customers/Customers";
import Statistics from "./pages/Statistics/Statistics";
import Discounts from "./pages/Discounts/Discounts";
import Loyalty from "./pages/Loyalty/Loyalty";
import Memberships from "./pages/Memberships/Memberships";
import Notifications from "./pages/Notifications/Notifications";
import Configuration from "./pages/Configuration/Contiguration";
import Help from "./pages/Help/Help";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <PrivateRoute>
              <ProductNew />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <Sales />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <PrivateRoute>
              <Statistics />
            </PrivateRoute>
          }
        />
        <Route
          path="/discounts"
          element={
            <PrivateRoute>
              <Discounts />
            </PrivateRoute>
          }
        />
        <Route
          path="/loyalty-points"
          element={
            <PrivateRoute>
              <Loyalty />
            </PrivateRoute>
          }
        />
        <Route
          path="/memberships"
          element={
            <PrivateRoute>
              <Memberships />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Configuration />
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
