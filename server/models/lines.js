const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Lines = new Schema({
  x1: {
    type: Number,
    required: true,
  },
  y1: {
    type: Number,
    required: true,
  },
  x2: {
    type: Number,
    required: true,
  },
  y2: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lines", Lines);
