const nodemailer = require("nodemailer");

exports.mailSender = async function (body, id) {

  let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    logger: true,
    greetingTimeout: 30000,
    ignoreTLS: true,
    auth: {
      user: 'ivanrumun759@gmail.com',
      pass: '12ivan34',
    },
  });

  let info = await transporter.sendMail({
    from: '<ivanrumun759@gmail.com>',
    to: "<node_test@ukr.net>",
    subject: `New order# ${id}`,
    html: `${body}`,
  });
  return info.messageId;
};

