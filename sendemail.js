const nodemailer = require('nodemailer');

const sendEmail = async (subject, send_to, send_from, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'somoonwork@gmail.com',
      pass: 'jocglrwqqhxjbisv',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: send_from,
    to: send_to,
    subject: subject,
    html: message,
  };

  // send email
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
