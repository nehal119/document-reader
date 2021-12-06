const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(cors("*"));

app.get("/", (req, res) => {
  res.status(200);
  res.send("Server is up and running");
});

app.get("/login", (req, res) => {
  res.status(200);
  res.send("Processing started");
});

db.once("open", function () {
  console.log("Connected!");
  app.listen(process.env.PORT, () =>
    console.log(`Listening at http://localhost:${process.env.PORT}`)
  );
});
