import { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoriesTable({
  categories,
  loading,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 8;

  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const totalPages = Math.ceil(filteredCategories.length / perPage);

  const paginatedCategories = filteredCategories.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) {
    return <p className="text-gray-600">Cargando categorías...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Buscar categoría..."
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
            Nueva Categoría
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              {["Nombre", "Acciones"].map((h) => (
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
            {paginatedCategories.map((category) => (
              <tr
                key={category.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {category.name}
                </td>

                <td className="py-4 px-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition"
                      title="Editar categoría"
                    >
                      <FaEdit className="text-gray-600 hover:text-blue-800" />
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      className="p-2 hover:bg-red-100 rounded-lg transition"
                      title="Eliminar categoría"
                    >
                      <FaTrash className="text-gray-600 hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedCategories.length === 0 && (
              <tr>
                <td colSpan={2} className="py-6 text-center text-gray-500">
                  No se encontraron categorías
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
