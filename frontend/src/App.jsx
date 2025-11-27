import { useEffect, useState } from "react";
import axios from "axios";
import AddItemForm from "./component/AddItemForm";
import EditItemForm from "./component/EditItemForm";
import ItemTable from "./component/ItemTable";

export default function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "http://backend:5000");

  useEffect(() => {
    axios
      .get(`${API_URL}/items`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err.message));
  }, [API_URL]);

  const handleAddItem = (newItem) => setItems((prev) => [...prev, newItem]);
  const handleUpdateItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };
  const handleDeleteItem = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <div style={{ padding: 20 }}>
      <h1>Café Inventory</h1>

      {editingItem ? (
        <EditItemForm
          item={editingItem}
          onUpdate={handleUpdateItem}
          onCancel={() => setEditingItem(null)}
        />
      ) : (
        <AddItemForm onAdd={handleAddItem} />
      )}

      <ItemTable
        items={items}
        onEdit={setEditingItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}
