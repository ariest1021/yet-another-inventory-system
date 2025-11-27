// backend/src/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./database.sqlite", // SQLite file
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      quantity INTEGER,
      reorder_threshold INTEGER,
      supplier TEXT,
      unit_cost REAL
    )
  `);

  return db;
}
