const db = require("../db");

const getPlans = async () => {
  const { rows } = await db.query("SELECT * FROM plan");
  return rows;
};

const getPlanAvailable = async () => {
  const { rows } = await db.query(
    `SELECT p.*
      FROM plan p
      JOIN stock s ON s.plan_id = p.id
      WHERE s.state = 'ready'
      GROUP BY p.id`
  );
  if (rows.length === 0) {
    return { message: "No available plans" };
  }
  return rows;
};

const getPlanStock = async (planId) => {
  const plan = await getPlanById(planId);
  if (!plan || plan.message === "Plan not found") {
    return { message: "Plan not found" };
  }

  const { rows } = await db.query(`
    SELECT 
      s.plan_id AS "planId",
      p.name AS "planName",
      COUNT(*) FILTER (WHERE s.state = 'ready') AS "ready",
      COUNT(*) FILTER (WHERE s.state = 'sold') AS "sold",
      COUNT(*) FILTER (WHERE s.state = 'error') AS "error"
    FROM stock s
    JOIN plan p ON s.plan_id = p.id
    WHERE s.plan_id = ${planId}
    GROUP BY s.plan_id, p.name;
`);
  if (rows.length === 0) {
    return { message: "No stock for this plan" };
  }
  return rows[0];
};

const getPlanById = async (planId) => {
  const { rows } = await db.query(`SELECT * FROM plan WHERE id = ${planId}`);
  if (rows.length === 0) {
    return { message: "Plan not found" };
  }
  return rows[0];
};

const purchase = async (planId, clientId) => {
  const stockResult = await db.query(
    `SELECT * FROM stock WHERE plan_id = ${planId} AND state = 'ready'`
  );
  if (stockResult.rows.length == 0) {
    return { success: false, message: "no stock" };
  }

  const clientResults = await db.query(
    `SELECT * FROM client WHERE id = ${clientId}`
  );

  if (clientResults.rows.length == 0) {
    return { success: false, message: "منيلك هاي الكلاوات" };
  }

  const planResult = await db.query(`SELECT * FROM plan WHERE id = ${planId}`);

  let user = clientResults.rows[0];
  let stock = stockResult.rows[0];
  let plan = planResult.rows[0];

  if (user.balance < parseInt(plan.price)) {
    return { success: false, message: "ماعندك فلوس، روح اشتغل وتعال" };
  }

  await db.query(`UPDATE stock SET state = 'sold' WHERE id = ${stock.id}`);
  await db.query(
    `UPDATE client SET balance = ${
      user.balance - plan.price
    } WHERE id = ${clientId}`
  );

  const result = await db.query(
    `INSERT INTO invoice (plan_id, code, client_id, price, plan_name)
    VALUES (${planId}, '${stock.code}', ${clientId}, ${plan.price}, '${plan.name}')
    RETURNING *;`
  );

  const newInvoice = result.rows[0];

  return { success: true, code: stock.code, newInvoice };
};

module.exports = {
  getPlans,
  getPlanAvailable,
  getPlanStock,
  getPlanById,
  purchase,
};
