const router = require("express").Router();
const controller = require("./contactController");

router.route("/").post(controller.contactPost);

module.exports = router;
