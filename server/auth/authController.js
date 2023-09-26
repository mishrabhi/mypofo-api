const UserService = require("../api/user/userService");
const AuthService = require("./authService");

module.exports.signup = async (req, res, next) => {
  const bodyData = req.body;
  console.log(bodyData);
  if (!bodyData.name || bodyData.name == "" || bodyData.name == null) {
    res.status(400).json({ message: "Required data not passed" });
  }
  if (
    !bodyData.password ||
    bodyData.password == "" ||
    bodyData.password == null ||
    bodyData.password.length <= 4
  ) {
    res.status(400).json({ message: "Required data not passed" });
  }
  if (!bodyData.email || bodyData.email == "" || bodyData.email == null) {
    res.status(400).json({ message: "Required data not passed" });
  }
  try {
    let users = await UserService.getUserByEmail(bodyData.email);
    if (users) {
      res.status(400).json({ message: "User already exists" });
    } else {
      console.log("here");
      let newUser = await UserService.createUser(bodyData);
      res.status(201).json({ message: "Signup Success", data: newUser });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.signin = (req, res, next) => {
  const user = req.user;
  const token = AuthService.signToken(user._id);
  res.status(200).json({ message: "Signin Success", token, data: user });
};
