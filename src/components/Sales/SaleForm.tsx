import { useState } from "react";
import type { Sale } from "@/types/sale";

interface Props {
  sale?: Sale;
  onSubmit: (data: Partial<Sale>) => void;
}

export default function SaleForm({ sale, onSubmit }: Props) {
  const isEditing = !!sale;

  const [status, setStatus] = useState(sale?.status || "EN_PREPARACION");
  const [paymentStatus, setPaymentStatus] = useState(
    sale?.paymentStatus || "PENDIENTE"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      status,
      paymentStatus,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isEditing && sale?.client && (
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Cliente</p>
          <p className="font-medium text-gray-800">{sale.client.name}</p>
        </div>
      )}

      {isEditing && sale?.orderNumber && (
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Número de Orden</p>
          <p className="font-medium text-gray-800">{sale.orderNumber}</p>
        </div>
      )}

      {isEditing && sale?.total && (
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-sm text-gray-600">Total</p>
          <p className="font-medium text-gray-800">${sale.total.toFixed(2)}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="EN_PREPARACION">En Preparación</option>
            <option value="ENVIADO">Enviado</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="COMPLETADO">Completado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pago</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="PAGADO">Pagado</option>
            <option value="FALLIDO">Fallido</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
      >
        Actualizar Venta
      </button>
    </form>
  );
}
