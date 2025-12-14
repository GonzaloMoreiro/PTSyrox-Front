import Modal from "./Modal";

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export default function ShippingInfoModal({ isOpen, onClose, client }: Props) {
  if (!isOpen || !client) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Información de Envío
        </h2>

        <div className="bg-gray-50 border rounded-2xl p-6 space-y-4 text-gray-800">
          <p>
            <strong>Nombre:</strong> {client.name}
          </p>

          <p>
            <strong>Email:</strong> {client.email || "—"}
          </p>

          <p>
            <strong>Teléfono:</strong> {client.phone || "—"}
          </p>

          <p>
            <strong>Dirección:</strong> {client.address || "—"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
