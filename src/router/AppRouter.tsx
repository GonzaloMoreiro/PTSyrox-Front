import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Categories from "../pages/Categories/Categories";
import Products from "../pages/Products/Products";
import Sales from "../pages/Sales/Sales";
import AdminLayout from "../layout/AdminLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Panel */}
        <Route element={<AdminLayout />}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
