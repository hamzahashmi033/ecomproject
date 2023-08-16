require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.send = async (to, subject, html, text = "") => {
  const message = await transporter.sendMail({
    from: "Funda <salesfunda.pk@gmail.com>",
    to,
    subject,
    html,
    text,
  });
  console.log("Email sent: ", message?.messageId);
  return message;
};
