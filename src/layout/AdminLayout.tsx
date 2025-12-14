import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <nav className="flex flex-col gap-2">
          <Link to="/categories" className="hover:text-gray-300">
            Categorías
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            Productos
          </Link>
          <Link to="/sales" className="hover:text-gray-300">
            Ventas
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
