const { validationResult } = require("express-validator");

// Middleware to handle validation errors from express-validator
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Only return the first error for simplicity
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
}

module.exports = validate;
