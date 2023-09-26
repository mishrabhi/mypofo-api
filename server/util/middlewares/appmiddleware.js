exports.logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

exports.notFound = (req, res, next) => {
  res.status(404).json({ message: "Request URI is not found" });
};

exports.handleError = (err, req, res, next) => {
  console.log(err);
  if (err.message === "Unauthorized") {
    res.status(401).json({ message: "Unauthorized Request" });
  } else {
    res.status(500).json({ message: "Something went wrong, please try later" });
  }
};
