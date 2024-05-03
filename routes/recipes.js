const express = require("express");
const router = express.Router();

// Search recipes
router.get("/", (req, res) => {
  res.send([]);
});

// Get recipe details
router.get("/:id", (req, res) => {
  res.send([]);
});

module.exports = router;
