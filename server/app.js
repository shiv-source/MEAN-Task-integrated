const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//connect the db configuration connection.
const dbConnection = require("./utils/db.config");

//use all the installed packages.
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Add routes here.
const userRouter = require("./routes/user");
app.use("/api/", userRouter);

module.exports = app;
