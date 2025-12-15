import { User, Bell, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white border-b border-gray-200 shadow-sm z-[1000]">
      <div className="px-20 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/vector-premium/logotipo-servicio-reparacion-automoviles-monocromo_679076-212.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </Link>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Notificaciones"
          >
            <Bell className="w-6 h-6 text-gray-700" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Perfil"
          >
            <User className="w-6 h-6 text-gray-700" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-red-100 transition"
            title="Cerrar sesión"
            onClick={handleLogout}
          >
            <LogOut className="w-6 h-6 text-red-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
