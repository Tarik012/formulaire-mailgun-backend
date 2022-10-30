const express = require("express");
const cors = require("cors");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);

let client;
try {
  client = mailgun.client({ username: "api", key: API_KEY });
  //console.log(client);
} catch (error) {}

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-data", async (req, res) => {
  try {
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname}<${req.body.email}>`,
      to: "tc78200@gmail.com",
      subject: "mail message",
      text: `${req.body.message}`,
    };

    const resultat = await client.messages.create(DOMAIN, messageData);

    console.log(resultat);

    res.json("ok");
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server startd");
});
