const router = require("express").Router();
const controller = require("./projectController");

// router.get("/", controller.blogList);
// router.post("/", controller.projectPost);
router.route("/").get(controller.projectList).post(controller.projectPost);

router
  .route("/:alias")
  .get(controller.getProjectByAlias)
  .delete(controller.deleteProject)
  .put(controller.updateProject);

module.exports = router;
