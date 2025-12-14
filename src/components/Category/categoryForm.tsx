import { useEffect, useState } from "react";

interface CategoryFormProps {
  onSubmit: (name: string) => void;
  defaultName?: string;
}

export default function CategoryForm({
  onSubmit,
  defaultName = "",
}: CategoryFormProps) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la categoría"
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
}
