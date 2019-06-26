const express = require("express");
const app = express();

// We're adding a piece of middleware
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("Name is required and should be minimum 3 characters.");
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const filteredCourse = courses.find(course => {
    return course.id === parseInt(req.params.id);
  });
  if (!filteredCourse) {
    res
      .status(404)
      .send(`The course with the ID ${req.params.id} was not found.`);
  }
  res.send(filteredCourse);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
