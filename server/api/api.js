const Router = require("express").Router();

Router.use("/blogs", require("./blogs/blogRoute"));
Router.use("/projects", require("./projects/projectRoute"));
Router.use("/users", require("./user/userRoutes"));

module.exports = Router;
