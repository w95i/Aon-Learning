const CheckAuth = (req, res, next) => {
  const AuthToken = req.headers["authorization"];
  if (AuthToken && AuthToken === "token") {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = CheckAuth;
