const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const plansRouter = require("./routes/plans");
const shoppingRouter = require("./routes/shopping");
const recipesRouter = require("./routes/recipes");
const usersRouter = require("./routes/users");
const kidsRouter = require("./routes/kids");
const tokenRouter = require("./routes/token");

const app = express();

app.use(cors());
app.use((req, res, next) => {
  if (
    !((req.path === "/token" || req.path === "/users") && req.method === "POST")
  ) {
    const token = req.headers.token;
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      req.auth = result;
    } catch (e) {
      return res.status(401).send();
    }
  }
  next();
});
app.use(express.json());

app.use("/plans", plansRouter);
app.use("/shopping", shoppingRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);
app.use("/kids", kidsRouter);
app.use("/token", tokenRouter);

app.listen(process.env.PORT, function () {
  console.log(`server is running at port ${process.env.PORT}`);
});
