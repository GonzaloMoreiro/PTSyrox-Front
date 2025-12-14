import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
}

interface ProductFormProps {
  onSubmit: (productData: Omit<Product, "id">) => void;
  categories: Category[];
  defaultProduct?: Product;
}

export default function ProductForm({
  onSubmit,
  categories,
  defaultProduct,
}: ProductFormProps) {
  const [name, setName] = useState(defaultProduct?.name || "");
  const [description, setDescription] = useState(
    defaultProduct?.description || ""
  );
  const [price, setPrice] = useState(defaultProduct?.price.toString() || "");
  const [stock, setStock] = useState(defaultProduct?.stock.toString() || "");
  const [categoryId, setCategoryId] = useState(
    defaultProduct?.categoryId || ""
  );

  useEffect(() => {
    if (defaultProduct) {
      setName(defaultProduct.name);
      setDescription(defaultProduct.description || "");
      setPrice(defaultProduct.price.toString());
      setStock(defaultProduct.stock.toString());
      setCategoryId(defaultProduct.categoryId);
    }
  }, [defaultProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || name.trim() === "") {
      alert("El nombre no puede estar vacío");
      return;
    }

    if (!categoryId) {
      alert("Debes seleccionar una categoría");
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    if (!stock || parseInt(stock) < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
      categoryId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del producto"
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del producto (opcional)"
          className="border p-2 w-full rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Categoría</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            className="border p-2 w-full rounded"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
      >
        Guardar
      </button>
    </form>
  );
}
