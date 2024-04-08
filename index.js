const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//FOUNDATION

const connectionString = process.env.MONGODB_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to the DB:", error);
  });

const { RequestModel } = require("./server/models/requestModel");

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("I am the GROOT Route");
});

//Create New Request
app.post("/request", (req, res) => {
  const newRequest = req.body;
  RequestModel.create(newRequest)
    .then((sentRequest) => {
      res
        .status(201)
        .json({ message: "Success request created!", sentRequest });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to create new request", error });
    });
});

//Read Request
app.get("/request", (req, res) => {
  RequestModel.find()
    .then((results) => {
      res.json({ message: "Success", results });
    })
    .catch((error) => {
      console.log("error reading data from DB", error);
      res.status(400).json({ message: "Unable to retrive data at this time" });
    });
});
//Read Request by ID
app.get("/request/:id", (req, res) => {
  const requestID = req.params.id;

  RequestModel.find(requestID)
    .then((results) => {
      res.json({ message: "Success", results });
    })
    .catch((error) => {
      console.log("error reading data from DB", error);
      res.status(400).json({ message: "Unable to retrive data at this time" });
    });
});

//Update Request
app.put("/request/:id", (req, res) => {
  //FIND THE DOC TO UPDATE
  const requestID = req.params.id;
  RequestModel.findByIdAndUpdate(requestID)
    .then((request) => {
      //UPDATE IN MEMORY
      request.isCompleted = !request.isCompleted;
      // SAVE TO DB
      return request.save();
    })
    .then((updatedRequest) => {
      res.json({ message: "Success", updatedRequest });
    })
    .catch((error) => {
      console.log("Error updating data from DB:", error);
      res.status(400).json({ message: "Unable to update request" });
    });
});

//Delete Request
app.delete("/request/:id", (req, res) => {
  const requestID = req.params.id;

  RequestModel.findByIdAndDelete(requestID)
    .then((request) => {
      res.json({ message: "Success", request });
    })
    .catch((error) => {
      console.log("Error deleting request from DB:", error);
      res.status(400).json({ message: "Unable to delete request" });
    });
});

//LISTENER
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
