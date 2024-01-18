// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import dotenv from "dotenv";
// dotenv.config();

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// const sendMail = async ({ recipientEmail, recipientName }) => {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();
//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "officialadityadixit@gmail.com",
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });
//     const mailOptions = {
//       from: "Aditya Dixit <officialadityadixit@gmail.com>",
//       to: recipientEmail,
//       subject: `Welcome🥰 ${recipientName} to our MovieBookingLive App`,
//       text: "Welcome  to our MovieBookngApp App",
//       html: "<h2>About Our App</h2><p>Our MovieBookingLive app is a one-stop destination for all your movie-related needs.</p><hr/> <br/><br/><br/><br/><br/>Thanks to register on moviebookinglive app. <br/>Aditya Kumar Dixit 🙏 </>",
//     };
//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (err) {
//     return err;
//   }
// };

// export default sendMail;

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

const sendMail = async ({
  recipientEmail,
  recipientName,
  resetPasswordLink,
}) => {
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
      subject: `Password Reset Instructions for ${recipientName}`,
      html: `
        <h2>Password Reset Instructions</h2>
        <p>Hello ${recipientName},</p>
        <p>We received a request to reset your password. Click the link below to reset your password:</p>
        <a href="${resetPasswordLink}">Reset Password</a>
        <p>If you did not initiate this request, please ignore this email.</p>
        <p>Best regards,<br/>
        Just Build 
        </p>
      `,
    };
    // console.log(recipientEmail)
    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (err) {
    return err;
  }
};

export default sendMail;
