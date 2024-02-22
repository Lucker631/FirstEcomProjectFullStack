const nodemailer = require("nodemailer");

// selecting mail service and authorazing with our credentials
const transport = nodemailer.createTransport({
  // you need to enable the less secure option on your gmail account
  // https://support.google.com/mail/answer/185833?hl=en
  // remember to enter your credentials in the .env file
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const send_email = async (req, res) => {
  console.log(req.body);
  const { name, email, subject, message } = req.body;
  const default_subject = "This is a default subject";
  const mailOptions = {
    // to: field is the destination for this outgoing email, your admin email for example. We can also include several email in an array, for example admin's email and user's email from the form. Check out official documentation of nodemailer message: https://nodemailer.com/message/
    // to: [process.env.DESTINATION_EMAIL, email],
    to: email, // coming from the request body
    replyTo: email, // An email address that will appear on the Reply-To: field
    subject: "New message from " + name,
    // The HTML version of the message -
    html: `<p>" 
      ${subject || default_subject} 
      </p><p><pre>
      ${message} 
      </pre></p>`,
  };
  try {
    const success = await transport.sendMail(mailOptions);
    console.log("success: ", success);
    if (success && success.response.includes("OK")) {
      return res.json({ ok: true, message: "email sent" });
    } else {
      return res.json({ ok: false, message: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err.message || err);
    return res.json({ ok: false, message: err.message || err });
  }
};

module.exports = { send_email };
