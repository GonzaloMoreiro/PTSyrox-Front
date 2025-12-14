import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

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
}

export default function ProductInventory({
  products,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const currentProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader className="pb-1"></CardHeader>

      <CardContent className="pt-2">
        {loading ? (
          <p className="text-gray-600 text-sm">Cargando productos...</p>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="relative w-1/3">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Buscar producto..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none bg-white"
                />
              </div>
              {/* Botón de agregar producto a la derecha */}
              <Link
                to="/products/new"
                className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition"
              >
                + Agregar Producto
              </Link>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase">
                      Nombre
                    </th>
                    <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase">
                      Stock
                    </th>
                    <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase">
                      Precio
                    </th>
                    <th className="py-3 px-5 text-left text-xs font-semibold text-gray-600 uppercase">
                      Categoría
                    </th>
                    <th className="py-3 px-5 text-center text-xs font-semibold text-gray-600 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-5 text-gray-900 font-medium">
                        {product.name}
                      </td>

                      <td className="py-4 px-5 text-gray-700">
                        {product.stock}
                      </td>

                      <td className="py-4 px-5 text-gray-800 font-semibold">
                        ${product.price.toFixed(2)}
                      </td>

                      <td className="py-4 px-5 text-gray-600">
                        {product.category.name}
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => onEdit(product)}
                            className="p-2 rounded-lg hover:bg-blue-100 transition-all"
                            title="Editar producto"
                          >
                            <FaEdit className="text-gray-600 hover:text-blue-700" />
                          </button>

                          <button
                            onClick={() => onDelete(product)}
                            className="p-2 rounded-lg hover:bg-red-100 transition-all"
                            title="Eliminar producto"
                          >
                            <FaTrash className="text-gray-600 hover:text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-200">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    page === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  Anterior
                </button>

                <span className="text-sm text-gray-600">
                  Página {page} de {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    page === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
