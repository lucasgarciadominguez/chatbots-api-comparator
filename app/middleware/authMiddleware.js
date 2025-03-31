const jwt = require("jsonwebtoken");

// Middleware for veryfing token
function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json({ error: "Access Denied" });

  // Uses only the token, eliminating "Bearer "
  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Invalid Token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Saves the user info in req.user
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = { authenticateToken };
