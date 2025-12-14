import { Construction } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center py-24 bg-gray-50">
      <div className="bg-white text-gray-800 p-10 rounded-3xl shadow-xl flex flex-col items-center gap-6 max-w-xl border border-gray-200">
        <Construction size={90} className="text-gray-600" />

        <h2 className="text-3xl font-bold text-gray-900">
          Página en construcción
        </h2>

        <p className="text-gray-600 text-lg max-w-md">
          Estamos trabajando para habilitar esta sección. Muy pronto vas a poder
          usarla.
        </p>

        <a
          href="/dashboard"
          className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition text-lg shadow"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
