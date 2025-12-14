import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar/sidebar";
import type { Sale } from "@/types/sale";
import SalesTable from "@/components/Sales/SalesTable";
import SalesModals from "@/components/Modal/SalesModal";
import Navbar from "@/components/Navbar/Navbar";

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [modals, setModals] = useState({
    add: false,
    edit: false,
    details: false,
  });

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Error al traer ventas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <SalesTable
            sales={sales}
            loading={loading}
            onEdit={(sale) => {
              setSelectedSale(sale);
              setModals((prev) => ({ ...prev, edit: true }));
            }}
            onView={(sale) => {
              setSelectedSale(sale);
              setModals((prev) => ({ ...prev, details: true }));
            }}
            onAdd={() => setModals((prev) => ({ ...prev, add: true }))}
          />

          <SalesModals
            selectedSale={selectedSale}
            modals={modals}
            setModals={setModals}
            setSales={setSales}
          />
        </div>
      </div>
    </div>
  );
}
