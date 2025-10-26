const db = require("../db");


const getStockAvailable = async () => {
    const { rows } = await db.query("SELECT COUNT(*) AS available_stock FROM stock WHERE state = 'ready'");
    if (rows.length === 0) {
        return [];
    }
    return rows.map(row => ({
        planId: row.plan_id,
        planName: row.plan_name,
        available: parseInt(row.available_stock, 10)
    }));
}