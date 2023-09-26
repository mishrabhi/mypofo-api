const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const blogRoute = require("./api/blogs/blogRoute");
const middleware = require("./util/middlewares/appmiddleware");
const authenticate = require("./auth/authService").authenticate;

const app = express();

app.use(middleware.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(config.mongoDB_URI)
  .then((dt) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is up and running" });
});

app.use("/api", authenticate, require("./api/api"));
app.use("/auth", require("./auth/authRoutes"));

app.use("*", middleware.notFound);
app.use(middleware.handleError);
module.exports = app;
