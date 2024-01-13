const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");
// const foodRouter = require("./routes/api/food");
const trainingRouter = require("./routes/api/training");
// const diaryRouter = require("./routes/api/diary");


const STATIC_PATH = path.join(__dirname, "public");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_PATH));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
// app.use("/food", foodRouter);
// app.use("/diary", diaryRouter);
app.use("/api/exercises", trainingRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
