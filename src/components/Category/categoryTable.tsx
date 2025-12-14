import { FaEdit, FaTrash } from "react-icons/fa";

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
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Categorías
        </h1>

        <button
          onClick={onAdd}
          className="bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition shadow"
        >
          Nueva Categoría
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando categorías...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3.5 px-6 text-left text-xs font-semibold text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="py-3.5 px-6 text-left text-xs font-semibold text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {cat.name}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEdit(cat)}
                        className="p-2 hover:bg-blue-100 rounded-lg"
                      >
                        <FaEdit className="text-gray-600 hover:text-blue-800" />
                      </button>

                      <button
                        onClick={() => onDelete(cat)}
                        className="p-2 hover:bg-red-100 rounded-lg"
                      >
                        <FaTrash className="text-gray-600 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-gray-500">
                    No hay categorías creadas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
