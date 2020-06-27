let shamir = require("../index");
let decimal = require("decimal.js");
let crypto = require("crypto");
const express = require("express");
const router = express.Router();
router.get("/cle", (req, res) => {
  const keys = shamir.generateKeys(); // return keys.public and keys.private
  var shares = shamir.splite(keys.private, 2, 2);
  const share1_hash = shares[0].hash;
  const share2_hash = shares[1].hash;

  console.log("Private key:  ", keys.private);
  console.log("Share1 hash:  ", share1_hash);
  console.log("Share2 hash:  ", share2_hash);

  const PublicKey = keys.public;

  res.send({ PublicKey: PublicKey });
});

module.exports = router;
