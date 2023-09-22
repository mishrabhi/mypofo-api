const ProjectService = require("./projectService");
const pagination = require("../../util/util").pagination;

//Create Project
module.exports.projectPost = (req, res, next) => {
  let bodyData = req.body;
  if (bodyData.title == "" || bodyData.title == null || !bodyData.title) {
    res.status(400).json({ message: "Title is a required field" });
  }
  if (
    bodyData.description == "" ||
    bodyData.description == null ||
    !bodyData.description
  ) {
    res.status(400).json({ message: "Description is a required field" });
  }
  bodyData.alias = bodyData.title.split(" ").join("-").toLowerCase();
  ProjectService.createProject(bodyData)
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

//Project List
exports.projectList = (req, res, next) => {
  let pag = pagination(req);

  let filter = {
    status: "active",
  };
  ProjectService.listProjects(filter, pag)
    .then((data) => {
      res.status(200).json({ message: "Ok", data });
    })
    .catch((err) => {
      next(err);
    });
};

//Delete Project
exports.deleteProject = (req, res, next) => {
  let alias = req.params.alias;

  ProjectService.deleteProject(alias)
    .then((dt) => {
      res.status(204).json({ message: "Project Deleted" });
    })
    .catch((err) => {
      next(err);
    });
};

//Update Project
exports.updateProject = (req, res, next) => {
  let alias = req.params.alias;
  let bodyData = req.body;
  ProjectService.updateProject(alias, bodyData)
    .then((data) => {
      res
        .status(200)
        .json({ message: `Project with alias ${alias} updated`, data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getProjectByAlias = (req, res, next) => {
  let alias = req.params.alias;
  ProjectService.getProjectByAlias(alias)
    .then((data) => {
      if (data) {
        res.status(200).json({ message: "Ok", data });
      } else {
        res
          .status(400)
          .json({ message: `Project with alias ${alias} not found` });
      }
    })
    .catch((err) => {
      next(err);
    });
};
