const express = require("express");
require("dotenv/config");

const recipesRouter = require("./routes/recipes");

const app = express();

app.use("/recipes", recipesRouter);

app.listen(process.env.PORT, function () {
  console.log(`server is running at port ${process.env.PORT}`);
});
