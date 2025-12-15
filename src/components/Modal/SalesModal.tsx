import axios from "axios";
import Modal from "@/components/Modal/Modal";
import type { Sale } from "@/types/sale";
import SaleForm from "../Sales/SaleForm";
import NewSaleForm from "../Sales/NewSaleForm";

interface Props {
  selectedSale: Sale | null;
  modals: {
    add: boolean;
    edit: boolean;
    details: boolean;
  };
  setModals: React.Dispatch<
    React.SetStateAction<{
      add: boolean;
      edit: boolean;
      details: boolean;
    }>
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
        onClose={() => setModals((p) => ({ ...p, add: false }))}
      >
        <div className="w-full max-w-6xl max-h-[70vh] overflow-y-auto bg-white rounded-xl shadow-xl p-4 text-sm space-y-3">
          <h2 className="text-lg font-semibold">Nuevo Pedido</h2>

          <div className="scale-[0.95]">
            <NewSaleForm
              onSubmit={async (data) => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/sales",
                    data
                  );

                  setSales((prev) => [...prev, res.data]);
                  setModals((p) => ({ ...p, add: false }));
                } catch (err) {
                  console.error(err);
                  alert("No se pudo crear el pedido.");
                }
              }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={modals.edit}
        onClose={() => setModals((p) => ({ ...p, edit: false }))}
      >
        {selectedSale && (
          <div className="w-full max-w-6xl max-h-[70vh] overflow-y-auto bg-white rounded-xl shadow-xl p-4 text-sm space-y-3">
            <h2 className="text-lg font-semibold">Editar Pedido</h2>

            <div className="scale-[0.95]">
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

                    setModals((p) => ({ ...p, edit: false }));
                  } catch (err) {
                    console.error(err);
                    alert("No se pudo actualizar el pedido.");
                  }
                }}
              />
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={modals.details}
        onClose={() => setModals((p) => ({ ...p, details: false }))}
      >
        {selectedSale && (
          <div className="w-full max-w-4xl max-h-[65vh] overflow-y-auto bg-white rounded-xl shadow-xl p-4 text-sm space-y-2">
            <h2 className="text-lg font-semibold">Detalle del Pedido</h2>

            <p>
              <span className="font-medium">Cliente:</span>{" "}
              {selectedSale.clientName}
            </p>

            <p>
              <span className="font-medium">Orden:</span>{" "}
              {selectedSale.orderNumber}
            </p>

            <p>
              <span className="font-medium">Estado:</span> {selectedSale.status}
            </p>

            <p>
              <span className="font-medium">Pago:</span>{" "}
              {selectedSale.paymentStatus}
            </p>

            <p className="font-semibold">
              Total: ${selectedSale.total.toFixed(2)}
            </p>

            {selectedSale.items && selectedSale.items.length > 0 && (
              <>
                <h3 className="font-semibold mt-2">Productos</h3>

                <ul className="space-y-1">
                  {selectedSale.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b text-xs py-1"
                    >
                      <span>
                        {item.productName} x {item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
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
