const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "Your Sender Name <your-email@example.com>",
      to: email,
      subject: "Verify Your Email Address",
      html: `<p>Hello,</p>
               <p>Please use the following verification code to confirm your email address:</p>
               <p><strong>${verificationCode}</strong></p>
               <p>Thank you.</p>`,
    });

    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
