import Modal from "@/components/Modal/Modal";

import type { Sale } from "@/types/sale";
import axios from "axios";
import SaleForm from "../Sales/SaleForm";
import NewSaleForm from "../Sales/NewSaleForm";

interface Props {
  selectedSale: Sale | null;
  modals: { add: boolean; edit: boolean; details: boolean };
  setModals: React.Dispatch<
    React.SetStateAction<{ add: boolean; edit: boolean; details: boolean }>
  >;
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
}

export default function SalesModals({
  selectedSale,
  modals,
  setModals,
  setSales,
}: Props) {
  return (
    <>
      <Modal
        open={modals.add}
        onClose={() => setModals((prev) => ({ ...prev, add: false }))}
      >
        <div className="w-full max-w-[90vw] p-16 bg-white rounded-2xl shadow-xl">
          <NewSaleForm
            onSubmit={async (data) => {
              try {
                const res = await axios.post(
                  "http://localhost:3000/sales",
                  data
                );
                setSales((prev) => [...prev, res.data]);
                setModals((prev) => ({ ...prev, add: false }));
              } catch (err) {
                console.error(err);
                alert("No se pudo crear el pedido.");
              }
            }}
          />
        </div>
      </Modal>

      <Modal
        open={modals.edit}
        onClose={() => setModals((prev) => ({ ...prev, edit: false }))}
      >
        {selectedSale && (
          <div>
            <h2 className="text-xl font-bold mb-2">Editar Pedido</h2>
            <SaleForm
              sale={selectedSale}
              onSubmit={async (data) => {
                try {
                  const res = await axios.patch(
                    `http://localhost:3000/sales/${selectedSale.id}`,
                    data
                  );
                  setSales((prev) =>
                    prev.map((s) => (s.id === selectedSale.id ? res.data : s))
                  );
                  setModals((prev) => ({ ...prev, edit: false }));
                } catch (err) {
                  console.error(err);
                  alert("No se pudo actualizar la venta.");
                }
              }}
            />
          </div>
        )}
      </Modal>

      <Modal
        open={modals.details}
        onClose={() => setModals((prev) => ({ ...prev, details: false }))}
      >
        {selectedSale && (
          <div>
            <h2 className="text-xl font-bold mb-2">Detalle de la Venta</h2>
            <p>
              <strong>Cliente:</strong> {selectedSale.client.name}
            </p>
            <p>
              <strong>Número de Orden:</strong> {selectedSale.orderNumber}
            </p>
            <p>
              <strong>Estado:</strong> {selectedSale.status}
            </p>
            <p>
              <strong>Pago:</strong> {selectedSale.paymentStatus}
            </p>
            <p>
              <strong>Total:</strong> ${selectedSale.total.toFixed(2)}
            </p>

            {selectedSale.items && selectedSale.items.length > 0 && (
              <>
                <h3 className="font-bold mt-4">Productos</h3>
                <ul>
                  {selectedSale.items.map((item, i) => (
                    <li key={i}>
                      {item.product.name} x {item.quantity} - $
                      {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
