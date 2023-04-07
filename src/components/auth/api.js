const express = require("express");
const authCtr = require("./service");
const { check } = require("express-validator");

const sendCreateUserSchema = require("./validate/create-user.json");
const sendLoginSchema = require("./validate/login.json");

const authRouter = express.Router();

const { validateSchema, ajv } = require("./../../../lib/validation");

ajv.addSchema(sendCreateUserSchema, "registration");
ajv.addSchema(sendLoginSchema, "login");

authRouter.post(
  "/register",
  validateSchema("registration"),
  authCtr.createUser
);
authRouter.post("/login", validateSchema("login"), authCtr.login);

module.exports = authRouter;
