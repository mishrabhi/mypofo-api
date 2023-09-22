const router = require("express").Router();
const controller = require("./userController");

router.post("/", controller.createUser);
router.get("/:id", controller.getSingleUser);

module.exports = router;
