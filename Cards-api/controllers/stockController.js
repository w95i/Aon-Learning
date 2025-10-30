const db = require("../db");
const { getPlanById } = require("./planController");

const getStockAvailable = async () => {
  const { rows } = await db.query(`
    SELECT 
      s.plan_id AS "planId",
      p.name AS "planName",
      CAST(COUNT(*) AS INTEGER) AS "available"
    FROM stock s
    JOIN plan p ON s.plan_id = p.id
    WHERE s.state = 'ready'
    GROUP BY s.plan_id, p.name
    ORDER BY s.plan_id;
  `);

  return rows;
};

const getStockSold = async () => {
  const { rows } = await db.query(`
    SELECT 
      s.plan_id AS "planId",
      p.name AS "planName",
      CAST(COUNT(*) AS INTEGER) AS "sold"
    FROM stock s
    JOIN plan p ON s.plan_id = p.id
    WHERE s.state = 'sold'
    GROUP BY s.plan_id, p.name
    ORDER BY s.plan_id;
  `);

  return rows;
};

const addStockBatch = async (planId, codes) => {
  const checkPlan = await getPlanById(planId);
  if (!checkPlan || checkPlan.message === "Plan not found") {
    return { message: "Plan not found" };
  }
  const plan_id = parseInt(planId);
  const values = codes
    .map((code) => `(${plan_id}, '${code}')`)
    .join(", ");

  const { rowCount } = await db.query(`
    INSERT INTO stock (plan_id, code)
    VALUES ${values}
  `);

  return { inserted: rowCount };
};

module.exports = {
  getStockAvailable,
  getStockSold,
  addStockBatch,
};
