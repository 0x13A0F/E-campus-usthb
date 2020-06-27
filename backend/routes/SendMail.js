var nodemailer = require("nodemailer");
const router = require("express").Router();
require("dotenv").config();

router.post("/SendMail", (req, res) => {
  const email = req.body.email;
  const object = req.body.object;
  const subject = req.body.subject;

  const MotDePasse = process.env.MotDePasse;

  var transporter = nodemailer.createTransport({
    service: "gmail",
//    secure: false, // use SSL , the port should be 465 for SSL connection or 587 for TLS.

    auth: {
      user: "************@gmail.com",
      pass: "*************",
    },
  });

  var mailOptions = {
    from: "E-cop email <*********@gmail.com>",
    to: email,
    subject: object,
    text: subject,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ Msg: false });
    } else {
      console.log("Email sent: " + info.response);
	res.json({ Msg: true });
    }
  });

});

module.exports = router;
