const express = require("express");
const { createHash } = require("crypto");
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

const router = express.Router();

// Login
router.post("/", async (req, res) => {
  const passwordHash = createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  const user = await knex("users")
    .where({
      username: req.body.username,
      password_hash: passwordHash,
    })
    .first();
  if (user) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.send({ token });
  } else {
    res.status(401).send({ message: "invalid user" });
  }
});

// Logout
router.delete("/", (req, res) => {
  res.send({});
});

module.exports = router;
