const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const blogRoute = require("./api/blogs/blogRoute");
const middleware = require("./util/middlewares/appmiddleware");

const app = express();

app.use(middleware.logger);

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

app.use("/api", require("./api/api"));

app.use("*", middleware.notFound);
app.use(middleware.handleError);
module.exports = app;
