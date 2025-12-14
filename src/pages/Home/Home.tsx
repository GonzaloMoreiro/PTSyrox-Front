import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar/sidebar";
import ProductInventorySummary from "@/components/Product/ProductInventorySummary";
import SalesSummary from "@/components/Sales/SalesSummary"; // ✅ Nuevo import
import Navbar from "@/components/Navbar/Navbar";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  description?: string;
  categoryId: string;
  category: Category;
}

interface Client {
  name: string;
}

interface Sale {
  id: string;
  client: Client;
  orderNumber: string;
  total: number;
  date: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, salesRes] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/sales"),
        ]);

        setProducts(productsRes.data);
        setSales(salesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="flex gap-6">
            <ProductInventorySummary products={products} loading={loading} />

            <div className="flex-1">
              <SalesSummary sales={sales} loading={loading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
