const User = require("./userModal");
const { v4: uuidv4 } = require("uuid");

exports.createUser = (data) => {
  return new Promise((resolve, reject) => {
    data.apiKey = uuidv4();
    let newUser = new User(data);
    console.log("dt", newUser);
    newUser
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
