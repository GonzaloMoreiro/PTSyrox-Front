import { Link } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Layers,
  BarChart2,
  Percent,
  Star,
  Bell,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function Sidebar() {
  const items = [
    { to: "/dashboard", label: "Inicio", icon: <Home size={18} /> },
    { to: "/products", label: "Productos", icon: <Package size={18} /> },
    { to: "/sales", label: "Ventas", icon: <ShoppingCart size={18} /> },
    { to: "/customers", label: "Clientes", icon: <Users size={18} /> },
    { to: "/categories", label: "Categorías", icon: <Layers size={18} /> },
    { to: "/statistics", label: "Estadísticas", icon: <BarChart2 size={18} /> },
    { to: "/discounts", label: "Descuentos", icon: <Percent size={18} /> },
    {
      to: "/loyalty-points",
      label: "Puntos de Lealtad",
      icon: <Star size={18} />,
    },
    { to: "/memberships", label: "Membresías", icon: <Users size={18} /> },
    { to: "/notifications", label: "Notificaciones", icon: <Bell size={18} /> },
    { to: "/settings", label: "Configuración", icon: <Settings size={18} /> },
    { to: "/help", label: "Ayuda", icon: <HelpCircle size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-xl border-r border-gray-200 p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 select-none">
        Dashboard
      </h1>

      <nav className="flex flex-col space-y-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="
              flex items-center gap-3 px-4 py-3
              text-gray-700 font-medium
              rounded-xl
              hover:bg-gray-100 hover:text-gray-900
              transition-all duration-200
            "
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
