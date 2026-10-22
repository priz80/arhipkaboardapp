const express = require("express");
const router = express.Router();
const { cardArray } = require("../data/products");

// Получить все товары
router.get("/", (req, res) => {
  const { category, search } = req.query;
  let products = cardArray.filter((p) => p.status === "active");

  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  if (search) {
    const lower = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.prise.toLowerCase().includes(lower)
    );
  }

  res.json({ success: true, data: products });
});

// Получить один товар
router.get("/:id", (req, res) => {
  const product = cardArray.find((p) => p.id === +req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Товар не найден" });
  }
  res.json({ success: true, data: product });
});

// ПУБЛИКАЦИЯ ЧЕРЕЗ БОТА (будущий функционал)
router.post("/", (req, res) => {
  const { title, prise, adress, description, category, img, botUserId } =
    req.body;

  // Валидация
  if (!title || !prise || !category) {
    return res.status(400).json({
      success: false,
      message: "Необходимо: title, prise, category",
    });
  }

  const newProduct = {
    id: Date.now(),
    title,
    prise,
    adress: adress || "",
    description: description || "",
    category,
    img: img || "/image/card-img.jpg",
    data: new Date().toISOString().split("T")[0],
    status: "active",
    author: botUserId || null,
  };

  // Временно добавляем в массив, потом заменим на MySQL INSERT
  cardArray.push(newProduct);

  res.json({
    success: true,
    message: "Объявление опубликовано",
    data: newProduct,
  });
});

module.exports = router;
