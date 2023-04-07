const express = require("express");
const userCtr = require("./service");
const authMiddleware = require("./../../../middleware/auth.middleware");

const updateUserSchema = require("./validate/update-user.json");
const Upload = require("./../../../lib/uploadFile");

const userRouter = express.Router();

const { validateSchema, ajv } = require("./../../../lib/validation");

const upload = new Upload("public/images");

ajv.addSchema(updateUserSchema, "updateUser");

userRouter.patch(
  "/me",
  authMiddleware,
  upload.single("image"),
  validateSchema("updateUser"),
  userCtr.update
);

module.exports = userRouter;
