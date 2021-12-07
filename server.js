const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const helmet = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");
var multer = require("multer");
const userController = require('./db/controllers/user');
dotenv.config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    res.status(200);
    res.send(files);
  });
});

app.get("/file/:id", (req, res) => {
  const { id } = req.params;
  res.sendFile(__dirname + "/uploads/" + id);
});


// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     res.status(401);
//     res.send("Access denied");
//     return;
//   }
//   if (username === "admin" && password === "admin") {
//     res.status(200);
//     res.send("User logged in");
//     return;
//   }
//   res.status(401);
//   res.send("Access denied");
//   return;
// });

app.post("/login", userController.login);
app.post("/add/user", userController.user_add);
app.post("/add/file/:id", userController.file_add);
app.get("/list/files/:id", userController.list_files);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).array("file");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
    // Everything went fine.
  });
});

db.once("open", function () {
  console.log("Connected!");
  app.listen(3001, () =>
    console.log(`Listening at http://localhost:3001`)
  );
});