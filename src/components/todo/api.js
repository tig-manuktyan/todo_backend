const express = require("express");
const authMiddleware = require("./../../../middleware/auth.middleware");
const todoCtr = require("./service");

const createTodoSchema = require("./validate/create-todo.json");
const deleteTodoSchema = require("./validate/delete-todo.json");
const updateTodoSchema = require("./validate/update-todo.json");

const todoRouter = express.Router();

const { validateSchema, ajv } = require("./../../../lib/validation");

ajv.addSchema(createTodoSchema, "createTodo");
ajv.addSchema(deleteTodoSchema, "deleteTodo");
ajv.addSchema(updateTodoSchema, "updateTodo");

todoRouter.post(
  "/",
  authMiddleware,
  validateSchema("createTodo"),
  todoCtr.createTodo
);
todoRouter.get("/", authMiddleware, todoCtr.getAll);
todoRouter.patch(
  "/",
  authMiddleware,
  validateSchema("updateTodo"),
  todoCtr.updateTodo
);
todoRouter.delete(
  "/",
  authMiddleware,
  validateSchema("deleteTodo"),
  todoCtr.deleteTodo
);

module.exports = todoRouter;
