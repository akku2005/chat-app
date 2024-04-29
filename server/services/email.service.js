const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const generateEmailTemplate = (verificationCode) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Verification Code</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
        }
        strong {
          color: #007bff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Password Reset Verification Code</h1>
        <h1>From Chit-Chat Hub</h1>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>Please use this code to reset your password.</p>
      </div>
    </body>
    </html>
  `;
};

const sendMail = async (email, verificationCode) => {
  try {
    await transporter.sendMail({
      from: "Chit-Chat Hub",
      to: email,
      subject: "Password Reset Verification Code",
      html: generateEmailTemplate(verificationCode),
    });

    console.log("Verification code email sent successfully.");
  } catch (error) {
    console.error("Error sending verification code email:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
};

module.exports = sendMail;

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// const generateEmailTemplate = (verificationCode, isPasswordReset = false) => {
//   let template;

//   if (isPasswordReset) {
//     template = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Password Reset Verification Code</title>
//         <style>
//           /* Your CSS styles here */
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>Password Reset Verification Code</h1>
//           <h1>From Chit-Chat Hub</h1>
//           <p>Your verification code is: <strong>${verificationCode}</strong></p>
//           <p>Please use this code to reset your password.</p>
//         </div>
//       </body>
//       </html>
//     `;
//   } else {
//     const verificationLink = `http:/http://localhost:5173/forgot-password?code=${verificationCode}`;
//     template = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Email Verification</title>
//         <style>
//           /* Your CSS styles here */
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1>Email Verification</h1>
//           <p>Please click the following link to verify your email address:</p>
//           <a href="${verificationLink}">${verificationLink}</a>
//         </div>
//       </body>
//       </html>
//     `;
//   }

//   return template;
// };

// const sendMail = async (email, verificationCode, isPasswordReset = false) => {
//   try {
//     const subject = isPasswordReset
//       ? "Password Reset Verification Code"
//       : "Email Verification";
//     const html = generateEmailTemplate(verificationCode, isPasswordReset);

//     await transporter.sendMail({
//       from: "Chit-Chat Hub",
//       to: email,
//       subject,
//       html,
//     });

//     console.log("Email sent successfully.");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// module.exports = sendMail;
