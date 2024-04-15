const mailer = require("nodemailer");

const mailSend = async (to, subject, text) => {
  const mailOptions = {
    from: "vivek.port1123@gmail.com",
    to: to,
    subject: subject,
    //   text: text
    html: "<h1>Welcome to app</h1><p>Thank you for joining us</p>",
  };

  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "vivek.port1123@gmail.com",
      pass: "vwcwqmsavwgrholy",
    },
  });

  const res = await transporter.sendMail(mailOptions);

  return res;
};
module.exports = {
  mailSend,
};
