const nodemailer = require("nodemailer");

const sendReferralEmail = async ({
  referrer,
  referrerEmail,
  referrerMessage,
  referee,
  refereeEmail,
  course,
  field,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: refereeEmail,
    subject: "You have been referred!",
    html: `
      Hi ${referee},<br><br>
      ${referrer} has referred you for a course. Here are the details:<br><br>
      <b>Course:</b> ${course}<br>
      <b>Field:</b> ${field}<br>
      <b>${referrer}'s Message:</b> ${referrerMessage}<br>
      <b>Website:</b> <a href="https://accredian.com/">https://accredian.com/</a><br><br>
      Please contact ${referrer} at ${referrerEmail} for more information.<br><br>
      Best regards,<br>
      Accredian
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendReferralEmail,
};
