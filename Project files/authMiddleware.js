const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

  try {
    const decoded = jwt.verify(token, "docspot_secret_key"); // You can use process.env.JWT_SECRET later
    req.user = decoded; // Attach user ID to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateUser;
