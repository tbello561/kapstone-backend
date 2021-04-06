const express = require("express");
const { nanoid } = require("nanoid");
const app = express();
const port = 3000;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

let db = {
  todos: [
    {
      title: "Jumpin Jacks",
      workout: "cardio",
      dueDate: new Date(),
      id: nanoid(),
      completed: false,
    },
  ],
  users: [
    {
      username: "Mr. T",
      password: "",
      id: nanoid(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send("testing 123...");
});

app.get("/todos", (req, res) => {
  res.json(db.todos);
});

app.post("/todos", (req, res) => {
  const todoIndex = db.todos.findIndex((todo) => todo.id === req.params.id);
  if (todoIndex === -1) {
    res.status(400).send("Bad request, this todo does not exist");
  }
  const newTodo = {
    title: req.body.title,
    workout: req.body.workout,
    dueDate: new Date(),
    id: nanoid(),
    completed: false,
  };
  db.todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
