const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const { createHash } = require("crypto");

// Register user
router.post("/", async (req, res) => {
  const passwordHash = createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  try {
    await knex("users").insert({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password_hash: passwordHash,
    });
    res.send();
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      res.status(400).send({ message: "username already exsits" });
    } else {
      res.status(400).send({ message: "Oops" });
    }
  }
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
