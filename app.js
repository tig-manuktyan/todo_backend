const express = require("express");
const cors = require("cors");

const routes = require("./src/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

routes(app);

module.exports = app;
