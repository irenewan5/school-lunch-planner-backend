const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({});
});

router.post("/", (req, res) => {
  res.send({});
});

router.put("/:date", (req, res) => {
  res.send({});
});

router.delete("/:date", (req, res) => {
  res.send({});
});

module.exports = router;
