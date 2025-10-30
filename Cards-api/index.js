const express = require("express");

const app = express();
const PORT = 3001;
const db = require("./db");
const plansRoutes = require("./routes/plan.route");
const clientsRoutes = require("./routes/client.route");
const StockRoutes = require("./routes/stock.route");
const invoiceRoutes = require("./routes/invoice.route");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Server is live ...");
});

app.use("/plans", plansRoutes);
app.use("/client", clientsRoutes);
app.use("/stock", StockRoutes);
app.use("/invoice", invoiceRoutes);

app.listen(PORT, () => {
  console.log("http://localhost:3001");
});

process.on("SIGINT", async () => {
  await db.end();
  process.exit(0);
});

// 8️⃣ POST /stock/batch
//    ➤ Purpose: Insert multiple card codes for one plan.
//    ➤ Body: { planId, codes: ["...", "..."] }
//    ➤ Response: { inserted: N }
