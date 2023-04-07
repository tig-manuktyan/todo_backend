const User = require("./../../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const response = require("./../../../helpers/http/response");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      const status = response.status.BAD_REQUEST;
      const data = response.dispatch({
        error: "email is already taken",
        code: status
      });
      return res.status(status).json(data);
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new User({ email, password: hashPassword });
    await user.save();
    
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "24h"
    });
    return res.json({
      token
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const status = response.status.NOT_FOUND;
      const data = response.dispatch({
        error: "User not found",
        code: status
      });
      return res.status(status).json(data);
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      const status = response.status.BAD_REQUEST;
      const data = response.dispatch({
        error: "Invalid password",
        code: status
      });
      return res.status(status).json(data);
    }
    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "24h"
    });
    return res.json({
      token
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};
