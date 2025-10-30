const express = require("express");
const router = express.Router();
const clientAuth = require("../middleware/clientAuth");
const { getClientInvoices } = require("../controllers/invoiceController");

router.get(`/client`, clientAuth, async (req, res) => {
  const clientId = req.user.id;
  try {
    const invoices = await getClientInvoices(clientId);
    if (invoices.message) {
      return res.status(404).json({ message: invoices.message });
    }
    return res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get(`/clients/:id`, async (req, res) => {
  const clientId = req.params.id;
  try {
    const invoices = await getClientInvoices(clientId);
    if (invoices.message) {
      return res.status(404).json({ message: invoices.message });
    }
    return res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;