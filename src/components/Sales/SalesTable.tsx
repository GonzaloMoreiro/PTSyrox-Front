import { useState, useMemo } from "react";
import { FaEdit, FaEye, FaSearch } from "react-icons/fa";

interface Client {
  name: string;
}

interface Sale {
  id: string;
  client: Client;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
}

interface Props {
  sales: Sale[];
  loading: boolean;
  onEdit: (sale: Sale) => void;
  onView: (sale: Sale) => void;
  onAdd: () => void;
}

export default function SalesTable({
  sales,
  loading,
  onEdit,
  onView,
  onAdd,
}: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 8;

  const filteredSales = useMemo(() => {
    return sales.filter(
      (s) =>
        s.client.name.toLowerCase().includes(search.toLowerCase()) ||
        s.orderNumber.toLowerCase().includes(search.toLowerCase())
    );
  }, [sales, search]);

  const totalPages = Math.ceil(filteredSales.length / perPage);

  const paginatedSales = filteredSales.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "enviado":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "en preparacion":
      case "en preparación":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "cancelado":
        return "bg-red-100 text-red-700 border border-red-200";
      case "completado":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getPaymentColor = (paymentStatus: string) => {
    switch (paymentStatus.toLowerCase()) {
      case "pagado":
      case "pago":
        return "bg-green-100 text-green-700 border border-green-200";
      case "pendiente":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "efectivo":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "tarjeta":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "transferencia":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "rechazado":
      case "fallido":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (loading) {
    return <p className="text-gray-600">Cargando ventas...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ventas</h1>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Buscar por cliente u orden..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          <button
            onClick={onAdd}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition shadow text-sm whitespace-nowrap"
          >
            Nuevo Pedido
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              {[
                "Cliente",
                "Número de Orden",
                "Estado",
                "Pago",
                "Total",
                "Acciones",
              ].map((h) => (
                <th
                  key={h}
                  className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedSales.map((sale) => (
              <tr
                key={sale.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {sale.client.name}
                </td>

                <td className="py-4 px-6 text-gray-600">{sale.orderNumber}</td>

                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                      sale.status
                    )}`}
                  >
                    {sale.status}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getPaymentColor(
                      sale.paymentStatus
                    )}`}
                  >
                    {sale.paymentStatus}
                  </span>
                </td>

                <td className="py-4 px-6 text-gray-600">
                  ${sale.total.toFixed(2)}
                </td>

                <td className="py-4 px-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(sale)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition"
                      title="Editar venta"
                    >
                      <FaEdit className="text-gray-600 hover:text-blue-800" />
                    </button>

                    <button
                      onClick={() => onView(sale)}
                      className="p-2 hover:bg-purple-100 rounded-lg transition"
                      title="Ver detalles"
                    >
                      <FaEye className="text-gray-600 hover:text-purple-800" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedSales.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No se encontraron ventas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
        >
          Anterior
        </button>

        <span className="text-gray-700 text-sm">
          Página {page} de {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
