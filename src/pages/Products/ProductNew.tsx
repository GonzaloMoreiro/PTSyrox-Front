import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar/sidebar";
import ProductForm from "@/components/Product/productForm";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductFormPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>(); // Para editar si existe ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    Promise.all([fetchCategories(), fetchProduct()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  const handleSubmit = async (productData: Omit<Product, "id">) => {
    try {
      if (id) {
        await axios.patch(`http://localhost:3000/products/${id}`, productData);
      } else {
        await axios.post("http://localhost:3000/products", productData);
      }
      navigate("/products");
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {id ? "Editar Producto" : "Nuevo Producto"}
        </h1>
        <ProductForm
          onSubmit={handleSubmit}
          categories={categories}
          defaultProduct={product || undefined}
        />
      </div>
    </div>
  );
}
