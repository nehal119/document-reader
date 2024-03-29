const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  files: [],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User);
