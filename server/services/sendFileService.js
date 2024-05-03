const fs = require("fs");

const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.status(200).send("<h1></h1>");
});
