import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
}

export default function ProductInventorySummary({
  products = [],
  loading,
}: Props) {
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const slicedProducts = products.slice(0, 5);

  return (
    <Card className="max-w-md shadow-xl rounded-2xl bg-white border border-gray-200">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Inventario de Productos
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-5">
        {loading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : (
          <>
            <div className="mb-6 flex justify-between p-4 bg-gray-100 rounded-xl shadow-inner gap-10">
              <div>
                <p className="text-sm text-gray-600">Total de Productos</p>
                <p className="text-xl font-semibold text-gray-900">
                  {totalProducts}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-xl font-semibold text-gray-900">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay productos en el inventario
              </div>
            ) : (
              <>
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-gray-700 text-sm font-semibold">
                        Nombre
                      </th>
                      <th className="py-2 px-4 text-gray-700 text-sm font-semibold">
                        Stock
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {slicedProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                      >
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {product.stock}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {products.length > 6 && (
                  <div className="mt-4 flex justify-center">
                    <Link
                      to="/products"
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition"
                    >
                      Ver todos
                    </Link>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
