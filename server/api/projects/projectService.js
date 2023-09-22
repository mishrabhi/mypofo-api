const Project = require("./projectModal");

module.exports.createProject = (data) => {
  return new Promise((resolve, reject) => {
    const newProject = new Project(data);
    newProject
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.listProjects = (filter, pagination) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await Project.find(filter).countDocuments();
      let data = await Project.find(filter)
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

exports.deleteProject = (alias) => {
  return new Promise((resolve, reject) => {
    Project.findOneAndDelete({ alias: alias })
      .then((data) => {
        resolve({ message: `Deleted project with alias ${alias}` });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.updateProject = (alias, bodyData) => {
  return new Promise((resolve, reject) => {
    Project.findOneAndUpdate(
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

exports.getProjectByAlias = (alias) => {
  return new Promise((resolve, reject) => {
    Project.findOne({ alias: alias })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
