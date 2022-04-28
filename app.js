const express = require("express");
const app = express();
const morgan = require("morgan");
const layout = require("./views/layout");
const { db, Page, User } = require("./models");

const wiki = require('./routes/wiki.js')
const users = require('./routes/users.js')


const PORT = 3000

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/user/', user);
app.use('/wiki/', wiki);

app.get('/', (req, res)=>{
  res.redirect('/wiki')
})

// app.get("/", (req, res) => {
//   console.log("hello world");
//   res.send(layout(""));
// });

const init = async ()=>{

  await db.sync();

  app.listen(PORT, () => {
    console.log(`App listening in ${PORT}`);
  });
}

init();
