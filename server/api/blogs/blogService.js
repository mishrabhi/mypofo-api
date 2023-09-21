const Blog = require("./blogModal");

exports.createBlog = (data) => {
  return new Promise((resolve, reject) => {
    const newBlog = new Blog(data);
    newBlog
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.listBlogs = (filter, pagination) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await Blog.find(filter).countDocuments();
      let data = await Blog.find(filter)
        .limit(pagination.psize)
        .skip(pagination.skip);
      resolve({
        count,
        data,
        pageNum: pagination.pno,
        pageSize: pagination.psize,
        filter,
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteBlog = (alias) => {
  return new Promise((resolve, reject) => {
    Blog.findOneAndDelete({ alias: alias })
      .then((data) => {
        resolve({ message: `Deleted blog with alias ${alias}` });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.updateBlog = (alias, bodyData) => {
  return new Promise((resolve, reject) => {
    Blog.findOneAndUpdate(
      { alias: alias },
      { $set: bodyData, $inc: { _v: 1 } },
      { new: true }
    )
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getBlogByAlias = (alias) => {
  return new Promise((resolve, reject) => {
    Blog.findOne({ alias: alias })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
