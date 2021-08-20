"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const BookModel = require("./models/books.js");

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const client = jwksClient({
  jwksUri: "https://dev-bqwezv2c.us.auth0.com/.well-known/jwks.json",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const PORT = process.env.PORT || 3001;

app.get("/clear", clear);
app.get("/seed", seed);

mongoose
  .connect("mongodb://127.0.0.1:27017/book-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  });

async function addBook(obj) {
  //CREATE R U D
  //{title: "", author: ""}
  let newBook = new BookModel(obj);
  return await newBook.save();
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/books", (req, res) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // jwt.verify(token, getKey, {}, function (err, user) {
    //   if (err) {
    //     res.status(500).send("invlaid token");
    //   } else {
    BookModel.find((err, dataBaseResults) => {
      if (err) {
        res.status(500).send("Can't access the database");
      } else {
        res.status(200).send(dataBaseResults);
      }
      // });
      // }
    });
  } catch (err) {
    res.status(500).send("database error");
  }
});

// Ryan convereted to a '/clear' endpoint then hits http://localhost:3001/clear to clear db
async function clear(req, res) {
  try {
    await BookModel.deleteMany({});
    res.status(200).send("Database cleared out");
  } catch (err) {
    res.status(500).send("Error in clearing database");
  }
}

// How Ryan seeded the DB
async function seed(req, res) {
  let books = await BookModel.find({});
  if (books.length <= 5) {
    await addBook({
      title: "The Growth Mindset",
      email: "wamj58@gmail.com",
      description:
        "A bunch of text about something or another that is about growing your mindset",
      status: "FAVORITE FIVE",
    });
  }
  res.send("Seeded The Database");
}
