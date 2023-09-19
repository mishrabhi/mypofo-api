exports.blogList = (req, res, next) => {
  console.log("Test");
  res.status(200).json({ message: "List of blogs" });
};
