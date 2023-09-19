const Router = require("express").Router();

Router.use("/blogs", require("./blogs/blogRoute"));

module.exports = Router;
