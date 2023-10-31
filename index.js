const express = require("express");
require("dotenv").config();
const app = express();
const connection = require("./config/db");

// const carrouter = require("./routes/car.routes");

// const { authRouter } = require("./routes/user.routes");
const book=require("./routes/book.route")

app.use(express.json());

const PORT = process.env.PORT;
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "https://charming-bombolone-60247a.netlify.app",
    // origin:"http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use("/auth", authRouter);

app.use("/book", book);

app.get("/", (req, res) => {
  res.send("send data");
});

app.listen(6000, async () => {
  try {
    await connection;
    console.log("db is running");
  } catch (error) {
    console.log(error);
  }
  console.log(`port is running 6000`);
});