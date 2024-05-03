const express = require("express");
require("dotenv/config");

const app = express();

app.listen(process.env.PORT, function () {
  console.log(`server is running at port ${process.env.PORT}`);
});
