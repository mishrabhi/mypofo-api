const router = require("express").Router();
const controller = require("./userController");

router.post("/", controller.createUser);
router.get("/:email", controller.getUserByEmail);

module.exports = router;
