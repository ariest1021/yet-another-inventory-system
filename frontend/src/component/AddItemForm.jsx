import { useEffect, useState } from "react";
import axios from "axios";

function AddItemForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 0,
    reorder_threshold: 0,
    supplier: "",
    unit_cost: 0,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/items`, form);
      onAdd(res.data);
      setForm({
        name: "",
        category: "",
        quantity: 0,
        reorder_threshold: 0,
        supplier: "",
        unit_cost: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="quantity" type="number" placeholder="Qty" value={form.quantity} onChange={handleChange} required />
      <input name="reorder_threshold" type="number" placeholder="Reorder" value={form.reorder_threshold} onChange={handleChange} required />
      <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} required />
      <input name="unit_cost" type="number" step="0.01" placeholder="Unit Cost" value={form.unit_cost} onChange={handleChange} required />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;