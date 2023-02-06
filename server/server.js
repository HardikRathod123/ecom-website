const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

const User = require("./models/user");

dotenv.config();
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected with database");
  }
});

/*------------  Middlewares ---------------*/

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//   ?  Required APIs
const api = require('./routes')
app.use(api)


app.post("/", (req, res) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Successfully saved data");
    }
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("listening on ", "http://localhost:3000/");
  }
});
