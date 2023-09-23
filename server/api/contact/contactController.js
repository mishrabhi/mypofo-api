const ContactService = require("./contactService");

//Create Contact
module.exports.contactPost = (req, res, next) => {
  let bodyData = req.body;
  if (bodyData.name == "" || bodyData.name == null || !bodyData.name) {
    res.status(400).json({ message: "Name is a required field" });
  }
  if (bodyData.email == "" || bodyData.email == null || !bodyData.email) {
    res.status(400).json({ message: "Email is a required field" });
  }
  ContactService.createContact(bodyData)
    .then((data) => {
      res.status(200).json({ message: "Created", data });
    })
    .catch((err) => {
      next(err);
    });
};
