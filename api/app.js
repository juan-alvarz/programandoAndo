require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo.js");

const app = express();

app.use(express.json()); // esta preparada para recibir info a través de un POST
app.use(cors());
//app.use(express.static("storage"));

const port = process.env.PORT || 3000;
// TODO lo que haya en api concatenado con la ruta
app.use("/api", require("./routes"));

app.listen(port, () => console.log(`App lista en puerto: ${port}`));

dbConnect();
