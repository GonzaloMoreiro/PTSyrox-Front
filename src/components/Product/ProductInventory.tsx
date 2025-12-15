import { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  category: Category;
}

interface Props {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAdd: () => void;
}

export default function ProductInventory({
  products,
  loading,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 8;

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) {
    return <p className="text-gray-600">Cargando productos...</p>;
  }
  console.log("ProductInventory renderizado, onAdd:", typeof onAdd);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Buscar producto..."
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
            + Agregar Producto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              {["Nombre", "Stock", "Precio", "Categoría", "Acciones"].map(
                (h) => (
                  <th
                    key={h}
                    className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {product.name}
                </td>

                <td className="py-4 px-6 text-gray-600">{product.stock}</td>

                <td className="py-4 px-6 text-gray-600">
                  ${product.price.toFixed(2)}
                </td>

                <td className="py-4 px-6 text-gray-600">
                  {product.category.name}
                </td>

                <td className="py-4 px-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition"
                      title="Editar producto"
                    >
                      <FaEdit className="text-gray-600 hover:text-blue-800" />
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 hover:bg-red-100 rounded-lg transition"
                      title="Eliminar producto"
                    >
                      <FaTrash className="text-gray-600 hover:text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No se encontraron productos
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
