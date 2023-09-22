const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

//Schema level middleware

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
    next();
  } else {
    this.password = this.encryptPassword(this.password);
    next();
  }
});

//Schema level methods

userSchema.methods = {
  encryptPassword: function (plainPass) {
    return bcrypt.hashSync(plainPass, 10);
  },
  authenticate: function (plainPass) {
    return bcrypt.compare(plainPass, this.password);
  },
};

module.exports = mongoose.model("users", userSchema);
