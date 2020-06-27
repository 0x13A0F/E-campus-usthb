const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
//app.use(bodyParser.json({ limit: "10mb", extended: true }));

app.use(express.json());
app.use(cors());
app.use("/symetrique", require("./routes/symetrique"));
app.use("/shamir", require("./routes/shamir"));
app.use("/SendingMail", require("./routes/sendingmail"));
app.use("/SendMail", require("./routes/SendMail"));

app.use("/RSA", require("./routes/RSANEW"));
app.use("/hash", require("./routes/hash"));

app.listen(5000);
