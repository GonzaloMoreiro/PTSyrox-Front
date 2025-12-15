import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "@/components/Sidebar/sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/Modal/Modal";

import CategoryForm from "@/components/Category/categoryForm";
import CategoriesTable from "@/components/Category/categoryTable";

interface Category {
  id: string;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error al traer categorías:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (name: string) => {
    try {
      const res = await axios.post("http://localhost:3000/categories", {
        name,
      });

      setCategories((prev) => [...prev, res.data]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error al agregar categoría");
    }
  };
  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (name: string) => {
    if (!selectedCategory) return;

    try {
      await axios.patch(
        `http://localhost:3000/categories/${selectedCategory.id}`,
        { name }
      );

      setCategories((prev) =>
        prev.map((c) => (c.id === selectedCategory.id ? { ...c, name } : c))
      );

      setIsEditModalOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar categoría");
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    if (!confirm(`¿Eliminar categoría "${category.name}"?`)) return;

    try {
      await axios.delete(`http://localhost:3000/categories/${category.id}`);
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar categoría");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 pt-20">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <CategoriesTable
            categories={categories}
            loading={loading}
            onAdd={() => setIsAddModalOpen(true)}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </main>
      </div>

      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nueva Categoría"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Categoría"
      >
        {selectedCategory && (
          <CategoryForm
            initialValue={selectedCategory.name}
            onSubmit={handleUpdateCategory}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}
