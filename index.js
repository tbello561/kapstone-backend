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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
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
      title: "Jumping Jacks",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Knee Push ups",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Sit Ups",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Stationary Lunges",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Squats",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Running in Place",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Hip Flexor",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Calf Raises",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicep Curls",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Wiper Crunch",
      dueDate: "Monday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Calf Raises",
      dueDate: "Tuesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Single Leg Bridge",
      dueDate: "Tuesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Side-lying Hip Abduction",
      dueDate: "Tuesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicycle Kicks",
      dueDate: "Tuesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Forearm Planks",
      dueDate: "Tuesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Side Lunges",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Burpees",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Calf Raises",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Squats",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Tricep Dips",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Pike-Push ups",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Russian Twist",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Overhead -Press",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Stationary Lunges",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicycle Kicks",
      dueDate: "Wednesday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Wiper Crunch",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicep-Curls",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Reverse Crunch",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Hip flexor",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Sit Ups",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicycle Kicks",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Pike Push ups",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Lateral Raises",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Jumping Jacks",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Stationary Lunges",
      dueDate: "Thursday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Sit Ups",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Squats",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Knee push ups",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicep-Curls",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Tricep Dips",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Overhead-Press",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Burpees",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Jumprope",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Forearm Planks",
      dueDate: "Friday",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Russian Twist",
      dueDate: "Friday",
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
  //   const todoIndex = db.todos.findIndex((todo) => todo.id === req.params.id);
  //   if (todoIndex === -1) {
  //     res.status(400).send("Bad request, this todo does not exist");
  //   }
  const newTodo = {
    title: req.body.title,
    dueDate: req.body.dueDate,
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
    res.json(user);
  }
  res.status(401);
});

app.get("/users/logout/:token", (req, res) => {
  const currentUser = db.users.find((u) => {
    if (u.token === req.params.token) {
      return true;
    } else {
      return false;
    }
  });
  if (!currentUser) {
    res.status(404).send("User Not Found");
  }
  currentUser.token = "";
  res.send(currentUser);
});

app.get("/users", (req, res) => {
  res.json(db.users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
