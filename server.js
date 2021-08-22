"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());

const PORT = process.env.PORT || 3001;

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
