const express = require("express");
const index = express();
const cors = require("cors");

index.use(express.json());
index.use(cors());

let todoItems = {};
// determins the id of the task
let currentId = 0;

//starting server on PORT 3000
index.listen(3000, () => {
  console.log("server is running");
});

//creating route /todos
index.get("/todos", (req, res) => {
  res.json(Object.values(todoItems));
});

//creating route /todos
index.get("/todos/:id", (req, res) => {
  const index = req.params.id;
  res.json(todoItems[index]);
});

//posting to JSON
index.post("/todos", (req, res) => {
  const title = req.body.title;
  const priority = req.body.priority;
  const date = req.body.date;

  //increases the id of the task by one
  currentId += 1;
  //sets currentId as the task id
  const id = currentId;

  const resp = {
    id: id,
    title: title,
    priority: priority,
    date: date,
  };

  todoItems[id] = resp;

  resp.success = true;

  res.json(resp);
});

index.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  delete todoItems[id];

  res.json({ success: true });
});
