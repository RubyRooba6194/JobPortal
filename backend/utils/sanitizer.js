const sanitize = require("mongo-sanitize");

// Sanitize every string field in the object
exports.sanitizeBody = (body) => {
  const result = {};
  for (let key in body) {
    if (typeof body[key] === "string") {
      result[key] = sanitize(body[key]);
    } else {
      result[key] = body[key];
    }
  }
  return result;
};
