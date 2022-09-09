const nodemailer = require("nodemailer");

const accountTransport = require("./account_transport.json");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: accountTransport.auth.user,
    pass: accountTransport.auth.pass,
  },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: accountTransport.auth.user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

const sendChangePasswordEmail = (name, email, changePasswordCode) => {
  transport
    .sendMail({
      from: accountTransport.auth.user,
      to: email,
      subject: "You are solicited change your password",
      html: `<h1>Change password for ${email}</h1>
        <h2>Hello ${name}</h2>
        <p>You have requested a password change for the email ${email},If you have not requested this password change, please contact support </p>
        <a href=http://localhost:3000/changepass/${changePasswordCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

transport
  .verify()
  .then(() => {
    console.log("Ready for send emails");
  })
  .catch((e) => console.log(e));

const sendEmailDonation = (name, email, amount) => {
  console.log("Check");
  transport
    .sendMail({
      from: accountTransport.auth.user,
      to: email,
      subject: "Thanks for you donation",
      html: `<h1>You are collab with programandoando.com</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for donate to our platform.
          You collab with ${amount} USD
        </p>
        </div>`,
    })
    .catch((err) => console.log(err));
};

transport
  .verify()
  .then(() => {
    console.log("Ready for send emails");
  })
  .catch((e) => console.log(e));

module.exports = {
  sendConfirmationEmail,
  sendChangePasswordEmail,
  sendEmailDonation,
};
