const User = require("../schema/user");

exports.login = function (req, res) {
  User.find(req.body)
    .then((user) => {
      if (user.length > 0) {
        delete user[0].username;
        delete user[0].password;
        res.status(200).json({success: true, data: user[0]._id});
        return;
      }
      res.status(200).json({ success: false, data: 'User not found!'});
      return;
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};

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
    res.status(200).json({ success: true, data: newUser._id });
  });
};

exports.file_add = function (req, res) {
  User.findById(req.params.id, function(err,user){
    if (err) {
      res.status(400).json(err)
      return;
    }
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

exports.list_files = function (req, res) {
  User.findById(req.params.id)
    .then((user) => {
      delete user.username;
      delete user.password;
      res.send(user.files);
    })
    .catch((err) => {
      return res.send(err);
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
