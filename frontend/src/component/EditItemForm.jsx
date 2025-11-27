import { useState, useEffect } from "react";
import axios from "axios";

export default function EditItemForm({ item, onUpdate, onCancel }) {
  const [form, setForm] = useState({ ...item });

  useEffect(() => {
    setForm({ ...item });
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.put(`${API_URL}/items/${item.id}`, form);
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}>
      <h3>Edit Item</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="quantity" type="number" placeholder="Qty" value={form.quantity} onChange={handleChange} required />
      <input name="reorder_threshold" type="number" placeholder="Reorder" value={form.reorder_threshold} onChange={handleChange} required />
      <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} required />
      <input name="unit_cost" type="number" step="0.01" placeholder="Unit Cost" value={form.unit_cost} onChange={handleChange} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 5 }}>Cancel</button>
    </form>
  );
}
