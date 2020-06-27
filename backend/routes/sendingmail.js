var nodemailer = require("nodemailer");
const router = require("express").Router();
require("dotenv").config();

router.post("/SendingMail", (req, res) => {
  const email = req.body.email;
  const hash = req.body.hash;

  const MotDePasse = process.env.MotDePasse;
  console.log("email", email);
  console.log("hash", hash);
  const watemail = email;
  var transporter = nodemailer.createTransport({
    service: "gmail",
//    secure: false, // use SSL  , the port should be 465 for SSL connection or 587 for TLS.

    auth: {
      user: "**********@gmail.com",
      pass: "*********"
    },
  });

  var mailOptions = {
    from: "E-cop private key <***********@gmail.com>",
    to: watemail,
    subject: "Sending Email using Node.js",
    text: hash,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });


});

module.exports = router;
