const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false, // Change to true after implementation
  },
  authorId: {
    type: String,
  },
  userId: {
    type: String,
  },
});

taskSchema.plugin(mongoosePaginate);

exports.TaskModel = mongoose.model("Task", taskSchema);
