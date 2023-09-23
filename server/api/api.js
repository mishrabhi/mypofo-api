const Router = require("express").Router();

Router.use("/blogs", require("./blogs/blogRoute"));
Router.use("/projects", require("./projects/projectRoute"));
Router.use("/users", require("./user/userRoutes"));
Router.use("/contacts", require("./contact/contactRoute"));

module.exports = Router;
