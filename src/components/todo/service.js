const Todo = require("../../../models/Todo");
const _ = require("lodash");

exports.createTodo = async (req, res, next) => {
  try {
    const { title, date } = req.body;
    const todo = new Todo({ title, date, userId: req.user.id });
    await todo.save();
    return res.json(_.pick(todo, ["title", "date", "_id"]));
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    return res.json({
      success: true,
      list: todos
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    console.log(1111111, _.pick());
    const todos = await Todo.updateOne(
      { _id: req.body.taskID },
      _.pick(req.body, ["title"])
    );
    return res.json({
      success: true,
      list: todos
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    console.log(req.body.taskID);
    await Todo.deleteOne({
      _id: req.body.taskID
    });

    return res.json({
      success: true
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};
