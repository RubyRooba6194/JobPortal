const jwt = require("jsonwebtoken");

/**
 * Auth middleware to verify JWT from cookies.
 * Sets req.user if token is valid, else returns 401.
 */
module.exports = (req, res, next) => {
  // Get token from cookie or Authorization header (Bearer)
  let token = req.cookies?.token;

  // Optionally support Authorization header (if needed)
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains at least user id, email, name
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
