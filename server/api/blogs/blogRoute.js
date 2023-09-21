const router = require("express").Router();
const controller = require("./blogController");

// router.get("/", controller.blogList);
// router.post("/", controller.blogPost);
router.route("/").get(controller.blogList).post(controller.blogPost);

router
  .route("/:alias")
  .get(controller.getBlogByAlias)
  .delete(controller.deleteBlog)
  .put(controller.updateBlog);

module.exports = router;
