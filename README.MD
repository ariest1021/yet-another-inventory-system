# ☕ Yet Another Inventory System

Barebones inventory and asset management system.

Built with **React**, **Node.js**, **Vite**, **Docker**, and **SQLite**.

---

## 🚀 Current Features

- Add, edit, delete, and view items
- Tracks stock, quantity, unit cost, and reorder threshold
- Asset tagging

---

## 📋 Item Properties

- Name
- Category
- Quantity
- Reorder Threshold
- Supplier
- Unit Cost

---

## Tech Stack

- **Frontend**: React, Vite
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Containerization:** Docker, Docker Compose

---

## Getting Started

### Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the App

1. Clone the repository:
```bash
git clone https://github.com/atabor1021/yet-another-inventory-system.git
cd yet-another-inventory-system
```
2. Start Docker containers:
```
docker-compose up --build
```
3. Access the application
* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:5000/items](http://localhost:5000/items)