const authRouter = require("./components/auth/api");
const todoRouter = require("./components/todo/api");
const userRouter = require("./components/user/api");

module.exports = (app) => {
  app.use("/auth", authRouter);
  app.use("/todo", todoRouter);
  app.use("/user", userRouter);
};
