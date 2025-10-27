const db = require("../db");

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

module.exports = {
  getStockAvailable,
  getStockSold,
};
