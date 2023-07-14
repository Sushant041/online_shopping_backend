var jwt = require("jsonwebtoken");
const jwt_secret = "youareanowauser";

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Invalid token" });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
