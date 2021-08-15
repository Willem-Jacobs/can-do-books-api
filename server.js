"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const client = jwksClient({
  jwksUri: "https://dev-bqwezv2c.us.auth0.com/.well-known/jwks.json",
});

const PORT = process.env.PORT || 3001;

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
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
