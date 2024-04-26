const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { TaskModel } = require("./server/models/taskModel");
const authenticateToken = require("./server/middleware/jwtToken");
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

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("I am the GROOT Route");
});

//Create New Request
app.post("/task", (req, res) => {
  const newTask = req.body;
  TaskModel.create(newTask)
    .then((sentTask) => {
      res.status(201).json({ message: "Success task created!", sentTask });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to create new task", error });
    });
});

//Read Request
app.get("/tasks", (req, res) => {
  const { searchTerm, limit, page } = req.query;
  const regex = new RegExp(searchTerm, "i");
  const userId = req.userId;

  TaskModel.paginate(
    { name: { $regex: regex }, userId: null },
    { page: page, limit: limit },
  )
    .then((results) => {
      console.log(results);
      res.json({ message: "Success", ...results });
    })
    .catch((error) => {
      console.log("error reading data from DB", error);
      res.status(400).json({ message: "Unable to retrieve data at this time" });
    });
});

//Get User's Tasks
app.get("/user-tasks", authenticateToken, (req, res) => {
  const { userId } = req;

  TaskModel.find({ userId })
    .then((results) => {
      res.json({ message: "Success", results });
    })
    .catch((error) => {
      console.log("error reading data from DB", error);
      res.status(400).json({ message: "Unable to retrieve data at this time" });
    });
});
//Read Request by ID
app.get("/task/:id", (req, res) => {
  const taskId = req.params.id;

  TaskModel.find(taskId)
    .then((results) => {
      res.json({ message: "Success", results });
    })
    .catch((error) => {
      console.log("error reading data from DB", error);
      res.status(400).json({ message: "Unable to retrieve data at this time" });
    });
});

//Update Request
app.put("/task/:taskId", authenticateToken, (req, res) => {
  //FIND THE DOC TO UPDATE
  const taskId = req.params.taskId;

  TaskModel.findByIdAndUpdate(taskId)
    .then((task) => {
      //UPDATE IN MEMORY
      task.userId = req.userId;
      // SAVE TO DB
      return task.save();
    })
    .then((updatedTask) => {
      res.json({ message: "Success", updatedTask });
    })
    .catch((error) => {
      console.log("Error updating data from DB:", error);
      res.status(400).json({ message: "Unable to update task" });
    });
});

//Delete Request
app.delete("/task/:id", (req, res) => {
  const taskId = req.params.id;
  TaskModel.findByIdAndDelete(taskId)
    .then((task) => {
      res.json({ message: "Success", task });
    })
    .catch((error) => {
      console.log("Error deleting task from DB:", error);
      res.status(400).json({ message: "Unable to delete task" });
    });
});

//LISTENER
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
