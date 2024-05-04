const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// List kids
router.get("/", async (req, res) => {
  const { userId } = req.auth;
  const kids = await knex("kids").where({ user_id: userId });
  res.send(kids);
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
