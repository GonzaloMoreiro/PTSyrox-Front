import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar/sidebar";
import ProductInventory from "@/components/Product/ProductInventory";
import ProductForm from "@/components/Product/productForm";
import Modal from "@/components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error al traer productos:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error al traer categorías:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ CORREGIDO: Agregar producto al array
  const handleAddProduct = async (productData: Omit<Product, "id">) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/products",
        productData
      );
      // Agregar el nuevo producto al final del array
      setProducts((prev) => [...prev, res.data]);
      setIsAddModalOpen(false);
    } catch (err: any) {
      console.error("Error al agregar producto:", err);
      alert(
        `Error al agregar el producto: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Editar
  const handleEditProduct = (product: Product) => {
    console.log("Abriendo modal para editar:", product);
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (productData: Omit<Product, "id">) => {
    console.log("handleUpdateProduct llamado con:", productData);

    if (!selectedProduct) {
      console.error("No hay producto seleccionado");
      return;
    }

    try {
      console.log("Actualizando producto ID:", selectedProduct.id);

      const res = await axios.patch(
        `http://localhost:3000/products/${selectedProduct.id}`,
        productData
      );

      console.log("Respuesta del servidor:", res.data);

      setProducts((prev) =>
        prev.map((p) => (p.id === selectedProduct.id ? res.data : p))
      );

      console.log("Cerrando modal...");
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err: any) {
      console.error("Error al actualizar producto:", err);
      console.error("Error response:", err.response?.data);
      alert(
        `Error al actualizar el producto: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Eliminar
  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`¿Eliminar producto "${product.name}"?`)) return;
    try {
      await axios.delete(`http://localhost:3000/products/${product.id}`);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err: any) {
      console.error("Error al eliminar producto:", err);
      alert(
        `Error al eliminar el producto: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Productos</h1>
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={() => navigate("/products/new")}
            >
              Nuevo Producto
            </button>
          </div>

          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <ProductInventory
              products={products}
              loading={loading}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}

          <Modal
            open={isEditModalOpen}
            onClose={() => {
              console.log("Cerrando modal de edición");
              setIsEditModalOpen(false);
              setSelectedProduct(null);
            }}
          >
            {selectedProduct && (
              <ProductForm
                key={selectedProduct.id}
                onSubmit={handleUpdateProduct}
                categories={categories}
                defaultProduct={selectedProduct}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
