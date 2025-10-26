const users = require("../../DB/users.json");

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  let user = users.find((u) => u.id === id);
  return user;
};

const addNewUser = (data) => {
  users.push(data);
  return { success: true, message: "User added successfully" };
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
};
