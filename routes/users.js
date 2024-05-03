const express = require("express");
const router = express.Router();

// Register user
router.post("/", (req, res) => {
  res.send({});
});

// Update profile
router.put("/me", (req, res) => {
  res.send({});
});

module.exports = router;
