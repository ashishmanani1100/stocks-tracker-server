import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS,
  },
});

/**
 * Send a simple email
 */
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Ashish" <${USER_EMAIL}>`, // Sender email
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
