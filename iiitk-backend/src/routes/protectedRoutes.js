// Create a protected route that requires authentication using the authenticateToken middleware:

// routes/protectedRoutes.js

const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route example
router.get("/protected", authenticateToken, (req, res) => {
  // Access the authenticated user via req.user
  res.json({ message: "Protected route accessed.", user: req.user });
});

module.exports = router;
