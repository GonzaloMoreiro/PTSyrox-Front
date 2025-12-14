import { useState, useMemo } from "react";
import type { Sale } from "@/types/sale";
import { FaEdit, FaEye } from "react-icons/fa";

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
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      const statusOK = statusFilter ? s.status === statusFilter : true;
      const paymentOK = paymentFilter
        ? s.paymentStatus === paymentFilter
        : true;
      return statusOK && paymentOK;
    });
  }, [sales, statusFilter, paymentFilter]);

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

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Ventas
        </h1>

        <button
          className="bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition shadow"
          onClick={onAdd}
        >
          Nuevo Pedido
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando ventas...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {[
                  "Cliente",
                  "Número de Orden",
                  "Estado",
                  "Pago",
                  "Total",
                  "Acciones",
                ].map((label, idx) => (
                  <th
                    key={idx}
                    className="py-3.5 px-6 text-left text-xs font-semibold text-gray-500 tracking-wider uppercase"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 text-gray-900 font-medium">
                    {sale.client.name}
                  </td>

                  <td className="py-4 px-6 text-gray-600">
                    {sale.orderNumber}
                  </td>

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

                  <td className="py-4 px-6 font-semibold text-gray-900">
                    ${sale.total.toFixed(2)}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex justify-start gap-3">
                      <button
                        onClick={() => onEdit(sale)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition"
                        title="Editar venta"
                      >
                        <FaEdit className="text-gray-600 hover:text-blue-800 text-lg" />
                      </button>

                      <button
                        onClick={() => onView(sale)}
                        className="p-2 hover:bg-purple-100 rounded-lg transition"
                        title="Ver detalles"
                      >
                        <FaEye className="text-gray-600 hover:text-purple-800 text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
        >
          Anterior
        </button>

        <span className="text-gray-700">
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
