const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DetectedObject = new Schema({
  type: {
    type: String,
    required: true,
  },
  lineName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DetectedObject", DetectedObject);
