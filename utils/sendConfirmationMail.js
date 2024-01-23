import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendConfirmationMail = async ({ recipientEmail, recipientName }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "adityadileepdixit@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "Aditya Dixit <adityadileepdixit@gmail.com>",
      to: recipientEmail,
      subject: `Confirmation regarding the message you have sent`,
      html: `
      <h2 style="color: #FF9933; font-size: 20px; text-align: center;">We Appreciate Your Message!</h2>

      <p>Hello ${recipientName},</p>
      
      <p>We have received your message and appreciate your interest in interacting with us.</p>
      
      <p>Our team will review your message, and you can expect a response within the next 2-3 working days.</p>
      
      <p>Thank you for choosing JustShare!</p>
      
      <hr style="border: 1px solid #ddd; margin: 1em 0;" />
      
      <p>Best Regards,<br />
      JustShare Team</p>
      
      <p>
        <a href="https://just-share-app.onrender.com/" style="color: #3498db; text-decoration: none;">
          Explore More
        </a>
      </p>
      
      `,
    };
    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (err) {
    return err;
  }
};

export default sendConfirmationMail;
