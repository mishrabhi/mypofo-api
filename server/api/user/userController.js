const { v4: uuidv4 } = require("uuid");
const userService = require("./userService");

exports.createUser = (req, res, next) => {
  let bodyData = req.body;

  if (
    bodyData.password === undefined ||
    bodyData.password === null ||
    !bodyData.password
  ) {
    res.status(400), json({ message: "required fields are not passed" });
  }
  if (
    bodyData.email === undefined ||
    bodyData.email === null ||
    !bodyData.email
  ) {
    res.status(400).json({ message: "required fields are not passed" });
  }
  bodyData.apiKey = uuidv4();

  userService
    .createUser(bodyData)
    .then((data) => {
      res.status(201).json({ message: "Created", data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSingleUser = (req, res, next) => {};
