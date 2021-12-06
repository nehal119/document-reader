const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");
var multer = require('multer')
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(cors("*"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).array('file')

app.get("/", (req, res) => {
  res.status(200);
  res.send("Server is up and running");
});

app.get("/login", (req, res) => {
  const { username, password} = req.body;
  if (!username || !password) {
    res.status(401);
    res.send("Access denied");
    return;
  }
  if (username === 'admin' && password === 'admin') {
    res.status(200);
    res.send("User logged in");
    return;
  }
  res.status(401);
  res.send("Access denied");
  return;
});

app.post('/upload',function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      // A Multer error occurred when uploading.
    } else if (err) {
        return res.status(500).json(err)
      // An unknown error occurred when uploading.
    } 
    
    return res.status(200).send(req.file)
    // Everything went fine.
  })
});


app.listen(3001, () =>
  console.log(`Listening at http://localhost:3001`)
);
