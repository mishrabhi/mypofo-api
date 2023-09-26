const router = require("express").Router();
const controller = require("./authController");
const verifyUser = require("./authService").verifyUser;

router.post("/signup", controller.signup);
router.post("/signin", verifyUser(), controller.signin);

module.exports = router;
