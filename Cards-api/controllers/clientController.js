const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (body) => {
  const phone = body.phone;
  const password = body.password;
  const name = body.name;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(`INSERT INTO Client (name, phone, password)
                VALUES
                ('${name}', '${phone}', '${hashedPassword}');`);

  if (result.rowCount === 1) {
    return true;
  } else {
    return false;
  }
};

const login = async (phone, password) => {
  const result = await db.query(
    `select * from client where phone = '${phone}'`
  );
  if (result.rowCount !== 1) {
    return { success: false, message: "user not found!" };
  }

  const user = result.rows[0];
  const hashedPassword = user.password;
  const isPassValid = await bcrypt.compare(password, hashedPassword);
  if (!isPassValid) {
    return { success: false, message: "لاتصير لوتي" };
  }

  const token = jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      name: user.name,
    },
    process.env.SECRET_KEY
  );

  return { success: true, token: token };
};

const getClientBalance = async (clientId) => {
  if (!clientId) {
    return { message: "clientId is required" };
  }

  const { rows: user } = await db.query(
    `SELECT id, name, balance FROM client WHERE id = ${clientId}`
  );
  if (user.length === 0) {
    return { message: "Client not found" };
  }
  return {  id: user[0].id, name: user[0].name, balance: user[0].balance  };
};

const topUpClientBalance = async (clientId, amount) => {
  const { rows: user } = await db.query(`SELECT id, name, balance FROM client WHERE id = ${clientId}`);
  if (user.length === 0) {
    return { message: "Client not found" };
  }

  const oldBalance = parseFloat(user[0].balance);
  const newBalance = oldBalance + parseFloat(amount);

  await db.query(`UPDATE client SET balance = ${newBalance} WHERE id = ${clientId}`);

  return { id: clientId, oldBalance, newBalance };
};

module.exports = {
  register,
  login,
  getClientBalance,
  topUpClientBalance,
};
