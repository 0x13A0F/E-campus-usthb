const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp({
  databaseURL: "https://Cryptographie.firebaseio.com",
});
/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nassim12345rah@gmail.com",
    pass: "nassim1921",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = "karimoussaid07@gmail.com";

    const mailOptions = {
      from: "Na ssim <nassim12345rah@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: "I'M A PICKLE!!!", // email subject
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});
