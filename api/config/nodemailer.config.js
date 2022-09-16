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
      html: `<h1>You have collaborated with <strong>programandoando</strong></h1>
        <h2>Hello ${name}!</h2>
        <p>
        Thanks for your donation, it is a very valuable contribution to the support
        of the page and the maintenance of the same.
        </br>
        You contributed with ${amount} USD
        </p>
        </div>`,
    })
    .catch((err) => console.log(err));
};

const sendNotificationEmail = (name, username,email,notification ) => {
  console.log("Check");
  transport
    .sendMail({
      from: accountTransport.auth.user,
      to: email,
      subject: "You have a new notification",
      html: `<h1>Email Notification</h1>
        <h2>Hello ${name} with the username ${username}</h2>
        <p>Thank you for subscribing to the notifications and news in the website ProgramandoAndo.
         You can see the new updates in ProgramandoAndo right now
         If you're interested in ${notification.description}, see the full update in:        
         </p>
         <a href=http://localhost:3000/login> Click here </a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports = {
  sendConfirmationEmail,
  sendChangePasswordEmail,
  sendEmailDonation,
  sendNotificationEmail
};
