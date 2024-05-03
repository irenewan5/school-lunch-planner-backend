const express = require("express");
const router = express.Router();

// List kids
router.get("/", (req, res) => {
  res.send({});
});

// Add a kid
router.post("/", (req, res) => {
  res.send({});
});

// Add a kid
router.put("/:id", (req, res) => {
  res.send({});
});

// Delete a kid
router.delete("/:id", (req, res) => {
  res.send({});
});

module.exports = router;
