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
router.post("/", async (req, res) => {
  const { userId } = req.auth;
  const [id] = await knex("kids").insert({
    name: req.body.name,
    user_id: userId,
  });
  const result = await knex("kids")
    .where({
      id,
      user_id: userId,
    })
    .first();
  res.send(result);
});

// Update a kid
router.put("/:id", async (req, res) => {
  const { userId } = req.auth;
  await knex("kids")
    .update({
      name: req.body.name,
    })
    .where({
      id: req.params.id,
      user_id: userId,
    });

  const result = await knex("kids")
    .where({
      id: req.params.id,
      user_id: userId,
    })
    .first();

  res.send(result);
});

// Delete a kid
router.delete("/:id", async (req, res) => {
  const { userId } = req.auth;
  const kid = await knex("kids")
    .where({
      id: req.params.id,
      user_id: userId,
    })
    .first();
  await knex("kids").delete().where({
    id: req.params.id,
    user_id: userId,
  });

  res.send(kid);
});

module.exports = router;
