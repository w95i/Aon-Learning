const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getClientBalance,
  topUpClientBalance,
} = require("../controllers/clientController");
const clientAuth = require("../middleware/clientAuth");

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const isSaved = await register(body);
    if (!isSaved) {
      return res.status(501).send({ message: "اكو مشكله بالدنيا..." });
    }
    res.send({ message: "Register succefully." });
  } catch (error) {
    res.status(500).send({ message: "اكو مشكله بالدنيا..." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const result = await login(body.phone, body.password);
    if (!result.success) {
      return res.status(501).send({ message: result.message });
    }
    res.send({ token: result.token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "اكو مشكله بالدنيا..." });
  }
});

router.get("/balance", clientAuth, async (req, res) => {
  try {
    const clientId = req.user.id;
    console.log("Client ID:", clientId);
    const balance = await getClientBalance(clientId);
    if (balance === "clientId is required") {
      return res.status(400).send({ message: "clientId is required" });
    }
    if (balance === "Client not found") {
      return res.status(404).send({ message: "Client not found" });
    }
    res.send(balance);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.post("/topup", clientAuth, async (req, res) => {
  try {
    const clientId = req.user.id;
    const { amount } = req.body;
    const result = await topUpClientBalance(clientId, amount);
    if (result.message) {
      return res.status(400).send({ message: result.message });
    }
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
