import { useState, useEffect } from "react";
import axios from "axios";
import ShippingInfoModal from "../Modal/ShippingInfo";

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ProductOption {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Props {
  onSubmit: (data: {
    clientId: string;
    items: { productId: string; quantity: number }[];
  }) => void;
}

export default function NewSaleForm({ onSubmit }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [userId, setUserId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    { productId: string; quantity: number }[]
  >([]);

  // MODAL ESTADO
  const [shippingModalOpen, setShippingModalOpen] = useState(false);

  const selectedClient = clients.find((c) => c.id === userId) || null;

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios.get("http://localhost:3000/users");
      setClients(res.data);
    };

    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    };

    fetchClients();
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { productId: "", quantity: 1 }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) return alert("Seleccioná un cliente.");
    onSubmit({
      clientId: userId,
      items: selectedProducts.filter((p) => p.productId !== ""),
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[95%] mx-auto space-y-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-6">
            <div className="bg-white border p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                Cliente
              </h3>

              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border p-2 rounded-lg w-full"
                required
              >
                <option value="">Seleccionar cliente</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedClient && (
              <div className="bg-gray-50 border p-6 rounded-2xl shadow-inner">
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Detalles del Cliente
                </h3>

                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Nombre:</strong> {selectedClient.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedClient.email ?? "—"}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {selectedClient.phone ?? "—"}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {selectedClient.address ?? "—"}
                  </p>

                  <button
                    type="button"
                    onClick={() => setShippingModalOpen(true)}
                    className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                  >
                    Ver información de envío
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white border p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                Productos
              </h3>

              {selectedProducts.map((item, index) => (
                <div key={index} className="flex gap-3 mb-4 items-center">
                  <select
                    value={item.productId}
                    onChange={(e) =>
                      setSelectedProducts((prev) => {
                        const updated = [...prev];
                        updated[index].productId = e.target.value;
                        return updated;
                      })
                    }
                    className="border p-3 rounded-lg flex-1"
                  >
                    <option value="">Seleccionar producto</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.price}) — Stock: {p.stock}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      setSelectedProducts((prev) => {
                        const updated = [...prev];
                        updated[index].quantity = Number(e.target.value);
                        return updated;
                      })
                    }
                    className="border p-3 rounded-lg w-24"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProducts((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-600 font-bold text-xl"
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddProduct}
                className="text-blue-600 font-semibold"
              >
                + Agregar producto
              </button>
            </div>
          </div>

          <div className="bg-white border p-8 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-xl text-gray-900 mb-5">
              Resumen del Pedido
            </h3>

            <p className="text-gray-700 text-lg">
              Productos agregados: <strong>{selectedProducts.length}</strong>
            </p>

            <p className="text-gray-700 text-lg mt-4">
              Total:{" "}
              <strong className="text-2xl">
                $
                {selectedProducts.reduce((acc, p) => {
                  const prod = products.find((x) => x.id === p.productId);
                  return acc + (prod ? prod.price * p.quantity : 0);
                }, 0)}
              </strong>
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-3 mt-10 rounded-xl text-lg hover:bg-gray-800 w-full"
        >
          Crear Pedido
        </button>
      </form>

      <ShippingInfoModal
        isOpen={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
        client={selectedClient}
      />
    </>
  );
}
