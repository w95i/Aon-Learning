const express = require("express");
const router = express.Router();
const {
  getStockAvailable,
  getStockSold,
  addStockBatch,
} = require("../controllers/stockController");

router.post("/batch", async (req, res) => {
  console.log("Received batch stock data:", req.body);
  const { planId, codes } = req.body;
  if (!planId || !Array.isArray(codes) || codes.length === 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  try {
    const insertedCount = await addStockBatch(planId, codes);
    if (insertedCount.message === "Plan not found") {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(201).json(insertedCount);
  } catch (error) {
    console.error("Error adding stock batch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/available", async (req, res) => {
  try {
    const availableStock = await getStockAvailable();
    res.status(200).json(availableStock);
  } catch (error) {
    console.error("Error fetching available stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sold", async (req, res) => {
  try {
    const soldStock = await getStockSold();
    res.status(200).json(soldStock);
  } catch (error) {
    console.error("Error fetching sold stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
