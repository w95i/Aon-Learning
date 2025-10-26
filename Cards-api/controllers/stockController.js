const db = require("../db");

const getStockAvailable = async () => {
  const { rows } = await db.query(`
    SELECT 
      s.plan_id AS "planId",
      p.name AS "planName",
      COUNT(*) AS "available"
    FROM stock s
    JOIN plan p ON s.plan_id = p.id
    WHERE s.state = 'ready'
    GROUP BY s.plan_id, p.name
    ORDER BY s.plan_id;
  `);

  return rows.map((row) => ({
    planId: row.planId,
    planName: row.planName,
    available: parseInt(row.available, 10),
  }));
};

module.exports = {
  getStockAvailable,
};
