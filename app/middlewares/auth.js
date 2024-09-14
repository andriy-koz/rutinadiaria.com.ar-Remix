const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
