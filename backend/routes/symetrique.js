const express = require("express");
const router = express.Router();
var CryptoJS = require("crypto-js");

router.route("/crypt").post((req, res) => {
  const { messageacrypter, cle } = req.body;
  console.log("reqbody", req.body);

  /*  var randHex = function (len) {
    var maxlen = 8,
      min = Math.pow(16, Math.min(len, maxlen) - 1);
    (max = Math.pow(16, Math.min(len, maxlen)) - 1),
      (n = Math.floor(Math.random() * (max - min + 1)) + min),
      (r = n.toString(16));
    while (r.length < len) {
      r = r + randHex(len - maxlen);
    }
    return r;
  };
  var number = randHex(32); */
  var encrypt = function (message = "", key = "") {
    var message = CryptoJS.AES.encrypt(message, key);
    return message.toString();
  };
  //var number = randHex(32);
  var MessageEncrypted = encrypt(messageacrypter, cle);
  console.log("khfif", messageacrypter);
  console.log("cle", cle);
  res.json({ message: MessageEncrypted, key: cle });
});

// cette valeur sera par la suite utilisé comme clé secrète pour l'algorithme de AES
// pour le chiffrement AES la taille(longueur) de la clé doit être de 128 bits, 192 bits, ou bien 256 bits, donc respectivement en hexadécimal 16, 24, ou bien 32.
// il est préférable d'utiliser une clé dont la longueur est 32 en hexadécimal.

// fonction de chiffrement : cette fonction reçoit en entré le message à chiffrer et la clé secrete qu'on généré  et retourne le message chiffré en base64 (de type string)

//fonction de déchiffrement : * cette fonction reçoit en entré le message à déchiffrer et la clé secrete avec laquel ce message à été chiffré
//                            * elle retorne en sortie le message en clair

router.route("/decrypt").post((req, res) => {
  var { msgadecrypter, key } = req.body;
  function decrypt(message = "", key = "") {
    var code = CryptoJS.AES.decrypt(message, key);
    var decryptedMessage = code.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  }
  const MessageEnClair = decrypt(msgadecrypter, key);
  res.json({ MessageEnClair });
});

// Exemple :
// le suivant va chiffrer et déchiffrer le message : 'chiffrement symétrique AES',  et affiche le message chiffré + le message en clair après le déchiffrement et la valeur de la clé secrète

//console.log("message en clair :", decrypt(MessageEncrypted, number));
//console.log("message chiffré :", MessageEncrypted);
//console.log("clé secrète :", number);

// Pour plus d'informations :  https://www.npmjs.com/package/crypto-js

module.exports = router;
