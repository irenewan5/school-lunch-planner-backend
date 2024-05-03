const express = require("express");
const router = express.Router();

// Login
router.post("/", (req, res) => {
  res.send({});
});

// Logout
router.delete("/", (req, res) => {
  res.send({});
});

module.exports = router;
