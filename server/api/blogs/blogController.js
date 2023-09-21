const BlogService = require("./blogService");
const pagination = require("../../util/util").pagination;

exports.blogList = (req, res, next) => {
  let pag = pagination(req);

  let filter = {
    status: "active",
  };
  if (req.query.blogCategory) {
    filter.blogCategory = req.query.blogCategory;
  }
  BlogService.listBlogs(filter, pag)
    .then((data) => {
      res.status(200).json({ message: "Ok", data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.blogPost = (req, res, next) => {
  let bodyData = req.body;
  if (bodyData.title == "" || bodyData.title == null || !bodyData.title) {
    res.status(400).json({ message: "Title is a required field" });
  }
  if (
    bodyData.blogCategory == "" ||
    bodyData.blogCategory == null ||
    !bodyData.blogCategory
  ) {
    res.status(400).json({ message: "Blog Catefory is a required field" });
  }
  bodyData.alias = bodyData.title.split(" ").join("-").toLowerCase();
  BlogService.createBlog(bodyData)
    .then((data) => {
      res.status(201).json({ message: "Created", data });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({ message: "Title already exists" });
      } else {
        next(err);
      }
    });
};

exports.deleteBlog = (req, res, next) => {
  let alias = req.params.alias;

  BlogService.deleteBlog(alias)
    .then((dt) => {
      res.status(204).json({ message: "Blog Deleted" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateBlog = (req, res, next) => {
  let alias = req.params.alias;
  let bodyData = req.body;

  BlogService.updateBlog(alias, bodyData)
    .then((data) => {
      res
        .status(200)
        .json({ message: `Blog with alias ${alias} updated`, data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBlogByAlias = (req, res, next) => {
  let alias = req.params.alias;
  BlogService.getBlogByAlias(alias)
    .then((data) => {
      if (data) {
        res.status(200).json({ message: "Ok", data });
      } else {
        res.status(400).json({ message: `Blog with alias ${alias} not found` });
      }
    })
    .catch((err) => {
      next(err);
    });
};
