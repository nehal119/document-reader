const User = require("../schema/user");

exports.user_add = function (req, res) {
  const { username, password } = req.body;
  const newUser = new User({
    username: username,
    password: password,
    files: [],
  });
  newUser.save(function (err, newUser) {
    if (err) {
      res.status(400);
    }
    res.json({ success: true, message: "User added", item: newUser });
  });
};

exports.file_add = function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, user) {
      if (err) return res.send(err);
      res.status(200);
      res.json({
        success: true,
        message: "user updated",
        item: user,
      });
      res.end();
    }
  );
};

exports.users_list = function (req, res) {
  User.find()
    .sort({ date: -1 })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      return res.send(err);
    });
};

exports.users_delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return res.send(err);
    res.send("Deleted successfully!");
  });
};

exports.users_device_list = function (req, res) {
  User.findOne({ username: req.body.username }, "devices")
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      return res.send(err);
    });
};

exports.users_details = function (req, res) {
  User.findById(req.body.id, function (err, user) {
    if (err) return res.send(err);
    res.send(user);
  });
};
