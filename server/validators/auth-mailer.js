const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
       user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
  }
});

const sendResetEmail = async (email, resetToken) => {
    const resetURL = `http://localhost:5173/new-password?token=${resetToken}`;
    
    const mailOptions = {
      from: '"Parishlesh" <parishleshfulvanshi@gmail.com>', // sender address
      to: email, // receiver
      subject: "Password Reset Request", // Updated subject line
      text: `You requested a password reset. Please use the following link to set a new password: ${resetURL}`, // Updated email body
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info); // Log the response from the email server
 
    } catch (error) {
      console.error("Error sending email:", error.message); // Log the error message
      throw new Error('Failed to send reset email');
    }
};

module.exports = sendResetEmail;
