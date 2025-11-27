// backend/src/index.js
import express from "express";
import cors from "cors";
import { initDB } from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors()); // frontend requests
app.use(express.json()); // parse json request bodies

let db;

// initializes db
initDB().then(database => {
  db = database;
  console.log("Database initialized successfully")
}).catch(err => console.error(err));
// checks if db is ready
app.use((req, res, next) => {
  if (!db) return res.status(503).json({ error: "Database not initialized yet." });
  next();
});

// Endpoints

// Gets all items
app.get("/items", async (req, res) => {
  try {
    const items = await db.all("SELECT * FROM items");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gets a single item
app.get("/items/:id", async (req, res) => {
  try {
    const items = await db.get("SELECT * FROM items WHERE id = ?", req.params.id);
    if (!items) return res.status(404).json({ error: "Item not found" });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Creates new item
app.post("/items", async (req, res) => {
  try {
    const { name, category, quantity, reorder_threshold, supplier, unit_cost } = req.body;
    const result = await db.run(
      "INSERT INTO items (name, category, quantity, reorder_threshold, supplier, unit_cost) VALUES (?, ?, ?, ?, ?, ?)",
      [name, category, quantity, reorder_threshold, supplier, unit_cost]
    );
    const newItem = await db.get("SELECT * FROM items WHERE id = ?", result.lastID);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Updates an existing item
app.put("/items/:id", async (req, res) => {
  try {
  const { name, category, quantity, reorder_threshold, supplier, unit_cost } = req.body;
  await db.run(
    "UPDATE items SET name=?, category=?, quantity=?, reorder_threshold=?, supplier=?, unit_cost=? WHERE id=?",
    [name, category, quantity, reorder_threshold, supplier, unit_cost, req.params.id]
  );
  const updatedItem = await db.get("SELECT * FROM items WHERE id = ?", req.params.id);
  res.json(updatedItem);
} catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletes an item
app.delete("/items/:id", async (req, res) => {
  try {
  await db.run("DELETE FROM items WHERE id=?", [req.params.id]);
  res.json({ message: "Item deleted!" });
} catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Starts server
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

