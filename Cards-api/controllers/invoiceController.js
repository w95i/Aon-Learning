const db = require("../db");

const getClientInvoices = async (clientId) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM invoice
    WHERE client_id = ${clientId}
    ORDER BY created_at DESC
    LIMIT 50
  `
  );
  if (rows.length === 0) {
    return { message: "No invoices found for this client" };
  }
  return rows;
};

module.exports = {
  getClientInvoices,
};
