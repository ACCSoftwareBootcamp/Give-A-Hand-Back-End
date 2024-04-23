const mongoose = require("mongoose");

const taskSchema = {
  taskType: {
    type: String,
    required: [true, "Type of Task is required"],
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
  inProgress: {
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
  timestamp: {
    type: Date,
    default: Date.now,
  },
};

exports.TaskModel = mongoose.model("userTask", taskSchema);
