const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
    },
    shortDescription: String,
    description: String,
    imageURL: String,
    status: {
      type: "string",
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    blogCategory: {
      type: String,
      required: true,
      enum: [
        "Javascript",
        "CSS",
        "HTML",
        "Boostrap",
        "Node",
        "Express",
        "MongoDB",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);
