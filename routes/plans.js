const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", (req, res) => {
  res.send({});
});

router.post("/", async (req, res) => {
  const { userId } = req.auth;
  const { date, kid_id, ...recipe } = req.body;
  const plan = await knex("plans")
    .where({
      user_id: userId,
      date,
      kid_id,
    })
    .first();
  if (plan) {
    await knex("plans").update(recipe).where({
      id: plan.id,
    });
  } else {
    await knex("plans").insert({
      user_id: userId,
      date,
      kid_id,
      ...recipe,
    });
  }
  const newPlan = await knex("plans")
    .where({
      user_id: userId,
      date,
      kid_id,
    })
    .first();
  res.send(newPlan);
});

router.delete("/:id", async (req, res) => {
  const { userId } = req.auth;
  const plan = await knex("plans")
    .where({
      user_id: userId,
      id: req.params.id,
    })
    .first();

  if (plan) {
    await knex("plans").delete().where({
      user_id: userId,
      id: req.params.id,
    });
    res.send(plan);
  } else {
    res.status(404);
  }
});

module.exports = router;
