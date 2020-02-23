const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger =require("morgan");

const apiRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.set("Contnt-Type", "application/problem+json");
  if (err.status === 500) {
    res.status(500).send("Internal Server Error.");
  }
  res.status(err.status).send(err.message)
});

module.exports = app;
