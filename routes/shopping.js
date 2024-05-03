const express = require("express");
const router = express.Router();

// Get shopping list
router.get("/", (req, res) => {
  res.send({});
});

module.exports = router;
