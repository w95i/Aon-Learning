const express = require("express");
const usersData = require("./users.json");

const app = express();
const port = 3002;

app.use(express.json());

//Get All Users
app.get("/users", (req, res) => {
  res.json(usersData);
});

//Get The First User
app.get("/users/first-user", (req, res) => {
  res.json(usersData[0]);
});

//Get The Last User
app.get("/users/last-user", (req, res) => {
  usersData.reverse();
  res.json(usersData[0]);
});

//Get User By ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = usersData.find((u) => {
    return u.id === id;
  });
  res.json(user);
});

//Get User by companyName
app.get("/company", (req, res) => {
  const companyName = req.query.companyName;
  const users = usersData.filter(
    (u) =>
      u.company.name.trim().toLowerCase() === companyName.trim().toLowerCase()
  );
  res.json(users);
});

//Get User by city
app.get("/city", (req, res) => {
  const city = req.query.city;
  const users = usersData.filter(
    (u) => u.address.city.trim().toLowerCase() === city.trim().toLowerCase()
  );
  res.json(users);
});

//Get street by user id
app.get("/street/:id", (req, res) => {
  const userid = parseInt(req.params.id);
  const user = usersData.find((u) => {
    return u.id === userid;
  });
  res.json({ street: user.address?.street });
});

//Add new user
app.post("/users/new-user", (req, res) => {
  usersData.push(req.body);
  res.json(req.body)
});

//Edit user by id
app.put("/users/edit-user/:id", (req,res)=>{
  const id = parseInt(req.params.id);
  const index = usersData.find(u=>{
    u.id === id;
  })
  usersData[index] = { ...usersData[index], ...req.body };
  res.json(usersData[index])
})

//Delete user by id
app.delete("/users/delete-user/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const user = usersData.find(u => {return u.id ===  id})
  usersData.shift(user)
  res.json(usersData)
})

app.listen(port, () => {
  console.log("Server Is Running");
});
