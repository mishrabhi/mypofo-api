const jwt = require("jsonwebtoken");
const User = require("../api/user/userModal");
const config = require("../config/config");

module.exports.verifyUser = () => {
  return function (req, res, next) {
    let bodyData = req.body;
    if (!bodyData.email || !bodyData.password) {
      return res.status(400).json({ message: "Required data not passed" });
    }
    User.findOne({ email: bodyData.email })
      .then((user) => {
        if (user) {
          if (!user.authenticate(bodyData.password)) {
            return res
              .status(401)
              .json({ message: "Credentils are not correct" });
          } else {
            user.password = "";
            req.user = user;
            next();
          }
        } else {
          return res
            .status(401)
            .json({ message: "Credentials are not correct" });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
};

module.exports.signToken = function (id) {
  return jwt.sign({ user: id }, config.jwtSecret, {
    expiresIn: config.jwtExpiry,
  });
};

module.exports.authenticate = function (req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      let decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded.user;
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  } else if (
    (req.headers["x-access-apikey"] && req.method == "GET") ||
    (req.headers["x-access-apikey"] &&
      req.url == "/api/contacts" &&
      req.method == "POST")
  ) {
    User.findOne({ apiKey: req.headers["x-access-apikey"] })
      .then((dt) => {
        req.user = dt._id;
        next();
      })
      .catch((err) => {
        next(new Error("Unauthorized"));
      });
  } else {
    next(new Error("Unauthorized"));
  }
};
