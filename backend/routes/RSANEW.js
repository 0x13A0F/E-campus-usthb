let shamir = require("../index.js");
let decimal = require("decimal.js");
let crypto = require("crypto");
var NodeRSA = require("node-rsa");

const router = require("express").Router();

router.post("/cle", (req, res) => {
  const IdFormulaire1 = req.body.IdFormulaire;
  const IdFormulaire = "Formulaire" + IdFormulaire1;
  console.log("IdFormulaire", IdFormulaire);
  var NodeRSA = require("node-rsa");
  var key = new NodeRSA();
  key.generateKeyPair(512);
  pub_key = key.exportKey("public");
  piv_key = key.exportKey("private");
  console.log("pub_key :  ", pub_key);
  console.log("piv_key :  ", piv_key);
  // eliminer les \n ....
  const ress = piv_key.replace(/\n/g, "").split("-----");
  console.log("ress[2] :", ress[2]);
  //----------------------------------------------------//
  // BASE 64 --> Hexadecimal + 0x .....
  const buf = new Buffer.from(ress[2], "base64");
  var data = buf.toString("HEX");
  data = "0x" + data;
  console.log("Hexa : ", data);
  //----------------------------------------------------//
  var shares = shamir.splite(data, 2, 2);

  const share1_hash = shares[0].hash;
  const share2_hash = shares[1].hash;
  console.log("Share1 hash:  ", share1_hash);
  console.log("Share2 hash:  ", share2_hash);
  //------------- Envoie a l'api ---------------------//
  const api_key = "72e072a4a8f3d664db60cce141e7c733";

  shamir.sendToServer(shares, api_key, IdFormulaire);

  data = data.substring(2);
  const buf2 = new Buffer.from(data, "HEX");
  const data2 = buf2.toString("Base64");
  console.log("Base 64 : ", data2);
  res.json({ PublicKey: pub_key, hash1: share1_hash, hash2: share2_hash });
});

router.post("/crypt", (req, res) => {
  var { Key, MessageACrypter } = req.body;
  console.log("key", Key);
  console.log("Message ", MessageACrypter);
  var Keyyyy = new NodeRSA(Key);
  const MessageCrypter = Keyyyy.encrypt(MessageACrypter, "base64");

  res.json({ MessageCrypter: MessageCrypter });
});

router.post("/GivePrivateKey", async (req, res) => {
  //--------------------------------------------//
  console.log("salam");
  const form_id = req.body.form_id;
  const share1_hash = req.body.share1_hash;
  const share2_hash = req.body.share2_hash;
  const api_key = "72e072a4a8f3d664db60cce141e7c733";
  //------------------------------------------------//
  /*  const form_id = "Formulaireayirdz8hf";
  const share1_hash =
    "aeb881f7b2543587502916a4c9ca813b657e06505c71475b406765bf9d117e03";
  const share2_hash =
    "81bb971908d7652f608275084219c57ba7d249dff40faaa0a009c130efec3cc7"; */
  //-----------------------------------------------------------------//
  share1 = (await shamir.getShareFromServer(api_key, form_id, share1_hash))
    .data;
  share2 = (await shamir.getShareFromServer(api_key, form_id, share2_hash))
    .data;

  console.log(share1);
  console.log(share2);
  // -------------------reconstruct the secret key
  const rsa_private_key = shamir.reconstruct([share1, share2]);
  data = rsa_private_key.toHex().substring(2);
  const buf2 = new Buffer.from(data, "HEX");
  const data2 = buf2.toString("Base64");

  const str =
    "-----BEGIN RSA PRIVATE KEY-----" + data2 + "-----END RSA PRIVATE KEY-----";
  /* var key = new NodeRSA(str); */
  res.json({ PrivateKey: str });
  //-----------------------------//
  /*  console.log("Base 64 : ", str);
  console.log(rsa_private_key.toHex()); */
});
// ------------------- Decrypter le message-------------------//
router.post("/decrypt", (req, res) => {
  var { Key, MessageADecrypter } = req.body;

  console.log("key", Key);
  console.log("Message ", MessageADecrypter);

  var Key2 = new NodeRSA(Key);
  const MessageClair = Key2.decrypt(MessageADecrypter, "utf-8");

  res.json({ MessageClair: MessageClair });
});

module.exports = router;

/* var key = new NodeRSA(
  "-----BEGIN RSA PRIVATE KEY-----MIICWwIBAAKBgQC0eqdH7znl2WW5HpvuXh606JpGfXjiur0Te0pjvMSx+mJ9G9urwp/rE66G2pCZ3s7ePk0utbaBjQbdU9yQhEo7o2CLRkwhjS8G/HpBrED22QVEHTg6vWPhTiHD5Ph6tQdjVO9BHxZnIF05UJ0QxvRewUpyjf/V6StOQNs4oRMN7QIDAQABAoGAWlyy1qxrU67GZKpzriRHwZJYdASsevC+bDulokxIO0g++Z7yHIxkn0GKd5CFJ9VLxDBzWni2uSSQFE7Bt0XVGC+eIOEjV+MPaMW56sYhLp2Xo+eu/85Qyo5kb4BaPCEXjo2VcpoYLFN8QYR6qNbDfI2/h557bkNYPBpLgiXTdkECQQD4Fnte1/OG5Kpdb8Kvf7iYqm8pVwuAqAGbTzJDqU276+19r1wjmItK9mXis7opaRb8F+vyFuyfD19DZgVSn0Z9AkEAujwtymnxkrxk3d8HRMAFMN3D7Te31hTEs/Iwuc0Xverln6tuzfRRWMV6JdRTXdcGgawZIl+KGAaLnVXFeGXQMQJAZuxE0Is9AAib2VnFZjPRrJyAs6DmJ8ELsZhAnSt/EWiGxa7bxfTCTR4+FLhFkmqD26A9BdmW30JsXjTUHnvvrQJAXKiaY85IWiiPyvAvbp5XNtPvqnQBbGtS3vEOGzOWr3BSpRmnfKMlYhSGzJGSlOrqGtRkgPyl+YQwLKzDHj8R0QJAQ1jSsAjF3BIRRMz5A0u04C8dYsddudIKG+HEsAumULfwD6RfZTcJYyXAp0RWK5qogWwW+Q58hJWcGHMri1fZAA==-----END RSA PRIVATE KEY-----"
);

console.log(
  key.decrypt(
    "mB7h1ItLT0GA1sSxEJnxcNWN7mx7HyoF5YvMmXnbGodLRU3uEF0XH+toA8EuwJLoDrd3oKKMYyk+zcGYn9xC9RgownJNlJY2j+C1xuQJA+5TJx09PNgD5b1QX6HKa6Gj8vCQ0WVHEjRGwPkRlQTw0vAUuQfQ6o7e++Ix/V/Sf/w=",
    "utf8"
  ))

var keyyyy = new NodeRSA(
  "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCQLJmC8XSBfzBYoyl9H8VuQuxihZpW8qUgSFEUZi/MBEfebOMOohXbz9PgtOp+8EFuw53hoIpo+87GyugSLQrYKMcMcO74u4//MfQ1tlwjad9ibk1M3PoBorJCPEo7JosVKUWzuktbEpJb3iphS5weTaqgNko54BMZXKDam1TZwIDAQAB-----END PUBLIC KEY-----"
);
console.log("encrypt : ", keyyyy.encrypt("ryad", "base64"));
 */
