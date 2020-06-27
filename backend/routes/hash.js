const express = require("express");
let crypto = require("crypto");
const router = require("express").Router();
const sha256 = require("sha256");

router.post("/hash", (req, res) => {
  const mat = req.body.mat;
  const mathash = sha256(mat);
  res.json({ MatriculeHashee: mathash });
});

module.exports = router;
