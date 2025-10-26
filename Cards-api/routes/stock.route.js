const express = require("express");
const router = express.Router();
const { getStockAvailable } = require("../controllers/stockController");

router.get("/available", async (req, res) => {
  try {
    const availableStock = await getStockAvailable();
    res.status(200).json(availableStock);
  } catch (error) {
    console.error("Error fetching available stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;