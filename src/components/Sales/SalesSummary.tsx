import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Client {
  name: string;
}

interface Sale {
  id: string;
  client: Client;
  orderNumber: string;
  total: number;
  createdAt: string;
}

interface Props {
  sales: Sale[];
  loading: boolean;
}

export default function SalesSummary({ sales = [], loading }: Props) {
  const sortedSales = [...sales].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const recentSales = sortedSales.slice(0, 5);

  return (
    <Card className="shadow-xl rounded-2xl bg-white border border-gray-200">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Ventas Recientes
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-5">
        {loading ? (
          <p className="text-gray-500">Cargando ventas...</p>
        ) : recentSales.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay ventas registradas
          </div>
        ) : (
          <>
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-gray-700 text-sm font-semibold">
                    Cliente
                  </th>
                  <th className="py-2 px-4 text-gray-700 text-sm font-semibold">
                    N° Orden
                  </th>
                  <th className="py-2 px-4 text-gray-700 text-sm font-semibold">
                    Saldo
                  </th>
                  <th className="py-2 px-4 text-gray-700 text-sm font-semibold">
                    Fecha
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {sale.client.name}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {sale.orderNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-green-600">
                      ${sale.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
              <Link
                to="/sales"
                className="bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition shadow"
              >
                Ver todas
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
