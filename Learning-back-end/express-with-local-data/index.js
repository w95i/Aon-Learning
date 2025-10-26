const express = require("express");
const app = express();
const port = 3100;
const usersRoutes = require("./Users/Routes/users.routes");

app.use(express.json());

app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Server is Running in http://localhost:${port}`);
});
