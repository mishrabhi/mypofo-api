const Contact = require("./contactModal");

module.exports.createContact = (data) => {
  return new Promise((resolve, reject) => {
    const newContact = new Contact(data);
    newContact
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
