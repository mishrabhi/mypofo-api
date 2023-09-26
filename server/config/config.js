module.exports = {
  mongoDB_URI: process.env.MONGODB_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: 60 * 24 * 60 * 2,
};
