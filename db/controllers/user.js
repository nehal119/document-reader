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
      return;
    }
    res.status(200).json({ success: true, message: "User added", item: newUser });
  });
};

exports.file_add = function (req, res) {
  User.findById(req.params.id, function(err,user){
    if (err) {
      res.status(400).json(err)
      return;
    }
    console.log(user);
    user.files.push(req.body);
    // user.markModified('brackets.rounds');
    user.save().then( () => {
      res.status(200).json('Info saved')
    }
    ).catch((err) => {
      res.status(400).json(err)
    })
  });
};

// exports.users_list = function (req, res) {
//   User.find()
//     .sort({ date: -1 })
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => {
//       return res.send(err);
//     });
// };

// exports.users_delete = function (req, res) {
//   User.findByIdAndRemove(req.params.id, function (err) {
//     if (err) return res.send(err);
//     res.send("Deleted successfully!");
//   });
// };

// exports.users_device_list = function (req, res) {
//   User.findOne({ username: req.body.username }, "devices")
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => {
//       return res.send(err);
//     });
// };

// exports.users_details = function (req, res) {
//   User.findById(req.body.id, function (err, user) {
//     if (err) return res.send(err);
//     res.send(user);
//   });
// };
