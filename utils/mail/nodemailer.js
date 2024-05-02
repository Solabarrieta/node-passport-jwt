const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'oieruni22@gmail.com',
    pass: 'wuoh lujd pjkm cixa'
  }
});
// const mail2Haizea = {
//   from: 'oieruni22@gmail.com', // sender address
//   to: "haizeagonzalez22@gmail.com", // list of receivers
//   subject: "Hello from my app 😎", // Subject line
//   text: "Holi! Te estoy enviando un correo desde una app jeje. Escribeme cuando lo veas porfa !! ", // plain text body
//   html: '<b>Holi! Te estoy enviando un correo desde una app jeje. Escribeme cuando lo veas porfa !!</b>', // html body
// }

const mail2Oier = {
  from: 'oieruni22@gmail.com', // sender address
  to: "oieruni22@gmail.com", // list of receivers
  subject: "Hello from my app 😎", // Subject line
  text: "Hello there !! ", // plain text body
  html: "<b>Hello there !!</b>", // html body
}
// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail(mail2Oier);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMail()
