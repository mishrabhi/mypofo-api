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

exports.getUserByEmail = (req, res, next) => {
  let email = req.params.email;
  userService
    .getUserByEmail(email)
    .then((data) => {
      if (data) {
        res.status(200).json({ message: "Ok", data });
      } else {
        res.status(400).json({ message: `User with email ${email} not found` });
      }
    })
    .catch((err) => {
      next(err);
    });
};
