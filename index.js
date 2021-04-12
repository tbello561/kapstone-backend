const express = require("express");
const { nanoid } = require("nanoid");
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const port = 3000;

const secret = "richardsimmons";

app.use(express.json());
app.use(morgan(":method :url :response-time"));

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

const db = {
  todos: [
    {
      title: "Jumpin Jacks",
      workout: "Cardio",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Push Ups",
      workout: "Upper Body",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Sit Ups",
      workout: "Upper Body",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Run Laps",
      workout: "Cardio",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Squats",
      workout: "Lower Body",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Hamstring Stretch",
      workout: "Stretches",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Hip Flexor",
      workout: "Stretches",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Chest and Shoulder Stretch",
      workout: "Stretches",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Calf Raises",
      workout: "Lower Body",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bridges",
      workout: "Lower Body",
      dueDate: new Date().toLocaleString(),
      id: nanoid(),
      completed: false,
    },
  ],
  users: [
    {
      username: "tommy",
      displayName: "tommy",
      password: "tommy",
      id: nanoid(),
      token: "",
    },
    {
      username: "test",
      displayName: "test",
      password: "test",
      id: nanoid(),
      token: "",
    },
  ],
};

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.slice(7) || "";
    var decoded = jwt.verify(token, secret);
    console.log(decoded);
    if (decoded) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
}

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
    dueDate: new Date().toLocaleString(),
    id: nanoid(),
    completed: false,
  };
  db.todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
  const todoIndex = db.todos.findIndex((todo) => todo.id === req.params.id);
  if (todoIndex === -1) {
    res.status(400).send("Bad request, this todo does not exist");
  }
  db.todos[todoIndex] = {
    ...db.todos[todoIndex],
    ...req.body,
    completed: !db.todos[todoIndex].completed,
    id: req.params.id,
  };
  res.json("Patch successful!");
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = db.todos.findIndex((todo) => todo.id === req.params.id);
  if (todoIndex === -1) {
    res.status(400).send("Bad request, this todo does not exist");
  }
  db.todos = db.todos.filter((todo) => todo.id !== req.params.id);
  res.json("Delete successful!");
});

//users endpoints----------------------------------------------------------------------

app.post("/users", (req, res) => {
  //   const userIndex = db.users.findIndex((user) => user.id === req.params.id);
  //   if (userIndex === -1) {
  //     res.status(400).send("Bad request, this user already exist");
  //   }
  const newUser = {
    username: req.body.username,
    displayName: req.body.displayName,
    password: req.body.password,
    id: nanoid(),
    token: "",
  };
  db.users.push(newUser);
  res.status(201).json(newUser);
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find((u) => {
    return u.username === username;
  });
  if (user.password === password) {
    const index = db.users.findIndex((u) => {
      return u.id === user.id;
    });
    const token = jwt.sign({}, secret);
    db.users[index].token = token;
    res.send(token);
  }
  res.status(401);
});

app.get("/users/logout", (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find((u) => {
    return u.username === username;
  });
  if (user.password === password) {
    const index = db.users.findIndex((u) => {
      return u.id === user.id;
    });
    db.users[index].token = "";
    res.send(db.users);
  }
  res.status(401);
});

app.get("/users", (req, res) => {
  res.json(db.users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
