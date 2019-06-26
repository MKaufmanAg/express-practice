const Joi = require("joi");
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
  const { error } = validateCourse(req.body); // result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
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

app.put("/api/courses/:id", (req, res) => {
  const filteredCourse = courses.find(course => {
    return course.id === parseInt(req.params.id);
  });
  if (!filteredCourse) {
    res
      .status(404)
      .send(`The course with the ID ${req.params.id} was not found.`);
  }

  const { error } = validateCourse(req.body); // result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update the course
  filteredCourse.name = req.body.name;
  res.send(filteredCourse);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

app.delete("/api/courses/:id", (req, res) => {
  const filteredCourse = courses.find(course => {
    return course.id === parseInt(req.params.id);
  });
  if (!filteredCourse) {
    res
      .status(404)
      .send(`The course with the ID ${req.params.id} was not found.`);
  }

  // Delete action
  const courseIndex = courses.indexOf(filteredCourse);
  courses.splice(courseIndex, 1);

  res.send(filteredCourse);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}
