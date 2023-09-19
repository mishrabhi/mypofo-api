const router = require("express").Router();
const controller = require("./blogController");
console.log("router");
router.get("/", controller.blogList);

module.exports = router;
