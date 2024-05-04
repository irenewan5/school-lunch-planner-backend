const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Register user
router.post("/", (req, res) => {
  res.send({});
});

router.get("/me", async (req, res) => {
  const result = await knex("users")
    .where({
      id: req.auth.userId,
    })
    .first();

  res.send(result);
});

// Update profile
router.put("/me", async (req, res) => {
  await knex("users")
    .update({
      name: req.body.name,
      email: req.body.email,
    })
    .where({
      id: req.auth.userId,
    });

  const result = await knex("users")
    .where({
      id: req.auth.userId,
    })
    .first();

  res.send(result);
});

module.exports = router;
