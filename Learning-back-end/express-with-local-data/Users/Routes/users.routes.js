const express = require("express");
const router = express.Router();
const CheckAuth = require("../../Middlewares/CheckAuth");
const {
  getAllUsers,
  getUserById,
  addNewUser,
} = require("../Controllers/users.controller");

//Get all users
router.get("/", async (req, res) => {
  try {
    let users = await getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "There are no users for now" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while getting users" });
  }
});

//Get user by id
router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error while getting user" });
  }
});
router.post("/", CheckAuth, (req, res) => {
  try {
    let newUser = req.body;
    let result = addNewUser(newUser);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
