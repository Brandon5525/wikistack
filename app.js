const express = require("express");
const app = express();
const morgan = require("morgan");
const layout = require("./views/layout");
const { db } = require("./models");

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello world");
  res.send(layout(""));
});

app.listen(3000, () => {
  console.log("App listening in port 3000");
});
