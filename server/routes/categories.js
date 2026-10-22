const express = require("express");
const router = express.Router();
const { categories } = require("../data/products");

router.get("/", (req, res) => {
  res.json({ success: true, data: categories });
});

module.exports = router;
