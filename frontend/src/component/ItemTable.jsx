import axios from "axios";

export default function ItemTable({ items, onEdit, onDelete }) {
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.delete(`${API_URL}/items/${id}`);
      onDelete(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <table border="1" cellPadding="8" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Reorder</th>
          <th>Supplier</th>
          <th>Unit Cost</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td>{item.reorder_threshold}</td>
            <td>{item.supplier}</td>
            <td>${item.unit_cost.toFixed(2)}</td>
            <td>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ marginLeft: 5 }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
