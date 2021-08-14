"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

var jwksClient = require("jwks-rsa");
const { response } = require("express");
var client = jwksClient({
  // EXCEPTION!  jwksUri comes from your single page application -> settings -> advanced settings -> endpoint -> the jwks one
  jwksUri: "https://dev-bqwezv2c.us.auth0.com/.well-known/jwks.json",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/test", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      res.status(500).send("invlaid token");
    }
    res.send(user);
  });

  // TODO:
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
