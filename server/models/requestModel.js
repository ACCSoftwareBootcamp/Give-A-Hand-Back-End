const mongoose = require("mongoose");

const requestSchema = {
  requestType: {
    type: String,
    required: [true, "Description of request is required"],
    minLength: [3, "Should be at least 3 characters long"],
    maxLength: [300, "Should be less than 300 characters"],
  },
  request: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
};

const RequestModel = mongoose.model("userRequest", requestSchema);

module.exports = RequestModel;
