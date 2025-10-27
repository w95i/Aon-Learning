const express = require("express");

const app = express();
const PORT = 3001;
const db = require("./db");
const plansRoutes = require("./routes/plan.route");
const clientsRoutes = require("./routes/client.route");
const StockRoutes = require("./routes/stock.route");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Server is live ...");
});

app.use("/plans", plansRoutes);
app.use("/client", clientsRoutes);
app.use("/stock", StockRoutes);

app.listen(PORT, () => {
  console.log("http://localhost:3001");
});

process.on("SIGINT", async () => {
  await db.end();
  process.exit(0);
});

// 4️⃣ GET /plans
//    ➤ Purpose: Return all available plans.
//
// 5️⃣ GET /plans/:id/stock
//    ➤ Purpose: Show stock summary for a single plan (ready/sold/error counts).
//    ➤ Response Example:
//        { planId, planName, ready, sold, error }
//
// 6️⃣ POST /client/:id/topup
//    ➤ Purpose: Add funds to a client’s wallet.
//    ➤ Body: { amount }
//    ➤ Response: { id, oldBalance, newBalance }
//
// 7️⃣ GET /invoice/client/:id
//    ➤ Purpose: Return recent invoices for one client (limit 50).
//
// 8️⃣ POST /stock/batch
//    ➤ Purpose: Insert multiple card codes for one plan.
//    ➤ Body: { planId, codes: ["...", "..."] }
//    ➤ Response: { inserted: N }
