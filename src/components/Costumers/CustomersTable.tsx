import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

interface Customer {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 8;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error al traer clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  const totalPages = Math.ceil(filteredCustomers.length / perPage);

  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) {
    return <p className="text-gray-600">Cargando clientes...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>

        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-400 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              {["Nombre", "Email", "Teléfono", "Dirección"].map((h) => (
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
            {paginatedCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="py-4 px-6 text-gray-600">{customer.email}</td>
                <td className="py-4 px-6 text-gray-600">
                  {customer.phone || "-"}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {customer.address || "-"}
                </td>
              </tr>
            ))}

            {paginatedCustomers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No se encontraron clientes
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
