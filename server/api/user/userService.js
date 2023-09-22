const User = require("./userModal");

exports.createUser = (data) => {
  return new Promise((resolve, reject) => {
    let newUser = new User(data);
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
