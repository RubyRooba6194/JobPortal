const csurf = require("csurf");

// This creates a CSRF protection middleware.
// You can configure it further as needed.
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
});

module.exports = csrfProtection;
