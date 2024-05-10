const express = require("express");
const app = express();
const dotenv = require("dotenv");
const routeApi = require("./routeApi");
const cors = require("cors");

dotenv.config();
PORT = process.env.API_PORT;
app.use(express.json());
app.use(cors());

const connectDB = require("./dbconnect");

connectDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log("error log");
  }
  console.log("server started", PORT);
});

app.get("/ser", (req, res) => {
  res.send({ msg: "server started with backend" });
  res.end();
});

app.use("/", routeApi);
