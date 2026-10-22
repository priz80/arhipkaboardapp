const express = require("express");
const path = require("path");
const cors = require("cors");

const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API маршруты
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Статика (React build)
app.use(express.static(path.join(__dirname, "../build")));

// SPA fallback — все запросы кроме /api/ отдаём index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API: http://localhost:${PORT}/api/products`);
  console.log(`✅ Categories: http://localhost:${PORT}/api/categories`);
  console.log(`✅ Frontend: http://localhost:${PORT}`);
});
