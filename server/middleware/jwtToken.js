const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req?.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  const decoded = jwt.decode(token);

  if (token == null) return res?.sendStatus(401);

  req.userId = decoded.sub;
  next();
}

module.exports = authenticateToken;
