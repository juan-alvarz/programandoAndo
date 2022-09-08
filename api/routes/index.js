const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname; // el path donde se encuentra este archivo

const removeExtension = (fileName) => {
  // va a coger el fileName (ej: courses.js) y le sacamos el js
  return fileName.split(".").shift();
};

const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`)); //http:localhost:3000/api/tracks
  }
});

module.exports = router;
