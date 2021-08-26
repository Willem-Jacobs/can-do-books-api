"use strict";

const express = require("express");
const router = express.Router();
const BookModel = require("../models/books.js");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const client = jwksClient({
  jwksUri: "https://dev-bqwezv2c.us.auth0.com/.well-known/jwks.json",
});

router.get("/clear", clear); //Clears DB
router.post("/seed", seed); //Seeds a book to the DB
router.get("/", getAll); //Gets all books from DB
router.get("/:id", getBookId, getById); //Gets one book from DB by ID using middleware
router.post("/", addNew); //Adds a new book to DB from form frontend
router.delete("/:id", getBookId, deleteById); //Deletes one book from DB by ID using middleware
router.put("/:id", updateById); // Update a record by ID. Not using the middleware

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Middleware
async function getBookId(req, res, next) {
  let book;
  try {
    book = await BookModel.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Cannot find a book" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
}

// Function to get all books
async function getAll(req, res) {
  const email = req.query.email;
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, getKey, {}, function (err, user) {
      if (err) {
        res.status(500).send("invlaid token");
      } else {
        BookModel.find({}, (err, dataBaseResults) => {
          if (err) {
            res.status(500).json({ message: err.message });
          } else {
            res.status(200).json(dataBaseResults);
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to get book by ID number. Middleware assistance.
function getById(req, res) {
  res.json(res.book);
}

// Function to add new book from form on frontend.
async function addNew(req, res) {
  const book = new BookModel({
    title: req.body.title,
    email: req.body.email,
    description: req.body.description,
    status: req.body.status,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Function to delete by ID using middleware to get the record by ID.
async function deleteById(req, res) {
  try {
    await res.book.remove();
    res.json({ message: "Deleted book" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to put (udpate) a record by ID this is NOT using the middleware to pre-load the record by ID.
async function updateById(req, res) {
  try {
    let myId = req.params.id;
    let { title, description, email, status } = req.body;
    const updatedBook = await BookModel.findByIdAndUpdate(
      myId,
      { title, description, email, status },
      { new: true, overwrite: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Function to clear all entries in DB.
async function clear(req, res) {
  try {
    await BookModel.deleteMany({});
    res.status(200).send("Database cleared out");
  } catch (err) {
    res.status(500).send("Error in clearing database");
  }
}

//Funtion to create new book and save as part of the sseding.
async function addBook(obj) {
  let newBook = new BookModel(obj);
  return await newBook.save();
}

// Function to seed the data.
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

module.exports = router;
