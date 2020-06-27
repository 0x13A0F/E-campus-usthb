var NodeRSA = require("node-rsa");
const express = require("express");
const router = express.Router();
const shamir = require("../index");
var key = new NodeRSA(); // Public and private

router.get("/cle", (req, res) => {
  key.generateKeyPair(512);
  console.log(key.exportKey("private"));
  const private_key = key.exportKey("private");
  const public_key = key.exportKey("public");
  //--------------------------------------------//
  const ress = private_key.replace(/\n/g, "").split("-----");

  console.log("base 64", ress[2]);
  const buf = new Buffer(ress[2], "base64");
  const data = buf.toString("HEX");
  console.log("Hexa : ", data);

  /* const buf2 = new Buffer(data, "HEX");
  const data2 = buf.toString("Base64");
  console.log("Base 64 : ", data2); */
  const wat = "0x" + data;
  var shares = shamir.splite(wat, 2, 2);
  // envoyer un pour le prof et le deuxieme au délégué //
  const share1_hash = shares[0].hash;
  const share2_hash = shares[1].hash;
  //--------------------------------------------------//
  res.json({
    public_key: public_key,
    partie1: share1_hash,
    partie2: share2_hash,
  });
});
router.route("/crypt").post((req, res) => {
  const { Vote, cle } = req.body;
  cle =
    "0x13cbf4589a10da6347fe0cf3bf04a2febf5f5830df687c9d6bf2da6efff8ee1d7fa8f683f292f39feeba95b5ece93dbdca3b3945fd3fb1827e35cece4022ea52f6361cebe1fc49d3a5d38320d159b669ef0e150b328b29910cba3881a92c8d2999e38534d00f758d2e5c87dcc6bb65b3ab33debc33293ae2227c439a98fcab72";
  //key.generateKeyPair(1024);
  var encrypted = cle.encrypt(Vote, "base64");
  //console.log(encrypted);
  //var keyy = key.exportKey("private");
  //var keyyy = new NodeRSA(keyy);
  res.json({ messageacrypter: encrypted });
});

router.post("/decrypt", (req, res) => {
  var encrypted = req.body.messageacrypter;
  var key = req.body.cle;
  var keyy = new NodeRSA(key);
  var decrypted = keyy.decrypt(encrypted, "utf8");
  res.json({ messageclaire: decrypted });
});

module.exports = router;
