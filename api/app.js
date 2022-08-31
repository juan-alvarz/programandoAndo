require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo.js");
const routes = require("./routes")

const app = express();

app.use(express.json());
app.use(cors());
//app.use(express.static("storage"));

const port = process.env.PORT || 3000;

app.use("/api", routes);

app.listen(port, () => console.log(`App lista en puerto: ${port}`));

dbConnect();
