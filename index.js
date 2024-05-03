const express = require("express");
const cors = require("cors");
require("dotenv/config");

const plansRouter = require("./routes/plans");
const recipesRouter = require("./routes/recipes");
const usersRouter = require("./routes/users");
const kidsRouter = require("./routes/kids");
const tokenRouter = require("./routes/token");

const app = express();

app.use(cors());

app.use("/plans", plansRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);
app.use("/kids", kidsRouter);
app.use("/token", tokenRouter);

app.listen(process.env.PORT, function () {
  console.log(`server is running at port ${process.env.PORT}`);
});
