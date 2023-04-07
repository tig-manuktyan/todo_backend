const User = require("./../../../models/User");
const _ = require("lodash");

exports.update = async (req, res, next) => {
  try {
    const values = req.body;
    if (req.file) {
      values.image = `images/${req.file.filename}`;
    }
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, values);
    return res.json({
      success: true,
      user: _.pick(user, ["email", "firstName", "image", "lastName", "phone"])
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};
