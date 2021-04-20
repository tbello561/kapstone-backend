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
      workout: "cardio",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Knee Push ups",
      dueDate: "Monday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Sit Ups",
      dueDate: "Monday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Stationary Lunges",
      dueDate: "Monday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Squats",
      dueDate: "Monday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Running in Place",
      dueDate: "Monday",
      workout: "cardio",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Hip Flexor",
      dueDate: "Monday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Calf Raises",
      dueDate: "Monday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicep Curls",
      dueDate: "Monday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Wiper Crunch",
      dueDate: "Monday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Calf Raises",
      dueDate: "Tuesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Single Leg Bridge",
      dueDate: "Tuesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Side-lying Hip Abduction",
      dueDate: "Tuesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicycle Kicks",
      dueDate: "Tuesday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Forearm Planks",
      dueDate: "Tuesday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Side Lunges",
      dueDate: "Wednesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Burpees",
      dueDate: "Wednesday",
      workout: "cardio",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Calf Raises",
      dueDate: "Wednesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Squats",
      dueDate: "Wednesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Tricep Dips",
      dueDate: "Wednesday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Pike-Push ups",
      dueDate: "Wednesday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Russian Twist",
      dueDate: "Wednesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Overhead Press",
      dueDate: "Wednesday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Stationary Lunges",
      dueDate: "Wednesday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicycle Kicks",
      dueDate: "Wednesday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Wiper Crunch",
      dueDate: "Thursday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicep-Curls",
      dueDate: "Thursday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Reverse Crunch",
      dueDate: "Thursday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Hip flexor",
      dueDate: "Thursday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Sit Ups",
      dueDate: "Thursday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicycle Kicks",
      dueDate: "Thursday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Pike Push ups",
      dueDate: "Thursday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Lateral Raises",
      dueDate: "Thursday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Jumping Jacks",
      dueDate: "Thursday",
      workout: "cardio",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Stationary Lunges",
      dueDate: "Thursday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Sit Ups",
      dueDate: "Friday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Squats",
      dueDate: "Friday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Knee push ups",
      dueDate: "Friday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Bicep-Curls",
      dueDate: "Friday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Tricep Dips",
      dueDate: "Friday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Overhead Press",
      dueDate: "Friday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Burpees",
      dueDate: "Friday",
      workout: "cardio",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Jumprope",
      dueDate: "Friday",
      workout: "cardio",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Forearm Planks",
      dueDate: "Friday",
      workout: "upperbody",
      id: nanoid(),
      completed: false,
    },
    {
      title: "Russian Twist",
      dueDate: "Friday",
      workout: "lowerbody",
      id: nanoid(),
      completed: false,
    },
  ],
  users: [
    {
      username: "tommy",
      displayName: "tommy",
      password: "tommy",
      height: "",
      weight: "",
      age: "",
      id: nanoid(),
      token: "",
    },
    {
      username: "test",
      displayName: "test",
      password: "test",
      height: "",
      weight: "",
      age: "",
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
  const { search, sortBy, filterBy } = req.query;
  console.log(search, filterBy, sortBy);

  let todos = db.todos;
  if (search) {
    todos = todos.filter((todo) => {
      return todo.workout.includes(search);
    });
  }

  if (filterBy) {
    if (filterBy === "completed") {
      todos = todos.filter((todo) => {
        return todo.completed;
      });
    } else {
      todos = todos.filter((todo) => {
        return !todo.completed;
      });
    }
  }

  if (sortBy) {
    todos = todos.sort((a, b) => {
      const x = a[sortBy].toLowerCase() < b[sortBy].toLowerCase();
      if (x) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  res.json(todos);
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
    height: "",
    weight: "",
    age: "",
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

app.patch("/users/:id", (req, res) => {
  const userIndex = db.users.findIndex((users) => users.id === req.params.id);
  if (userIndex === -1) {
    res.status(400).send("Bad request, this user does not exist");
  }

  db.users[userIndex] = {
    ...db.users[userIndex],
    ...req.body,
    height: req.body.height,
    weight: Number(req.body.weight),
    age: Number(req.body.age),
    id: req.params.id,
  };
  res.json(db.users[userIndex]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
