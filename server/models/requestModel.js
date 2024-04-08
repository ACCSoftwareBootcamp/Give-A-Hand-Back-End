const mongoose = require("mongoose");

const requestSchema = {
  taskType: {
    type: String,
    required: [true, "Type of request is required"],
    minLength: [1, "Should be at least 1 characters long"],
    maxLength: [15, "Should be less than 15 characters"],
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 300,
    required: [true, "Description is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
};

exports.RequestModel = mongoose.model("userRequest", requestSchema);
