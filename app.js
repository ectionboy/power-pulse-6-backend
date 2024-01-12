const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const { HttpError } = require("./helpers");
const path = require("path");

const authRouter = require("./routes/api/auth");
// const foodRouter = require("./routes/api/food");
// const trainingRouter = require("./routes/api/training");
// const diaryRouter = require("./routes/api/diary");

const STATIC_PATH = path.join(__dirname, "public");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_PATH));

app.use("/api/auth", authRouter);
// app.use("/food", foodRouter);
// app.use("/training", trainingRouter);
// app.use("/diary", diaryRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
